import { getAllWebinarRegistrations, markWebinarReminderSent } from '../db';
import { sendWebinarReminderEmail } from '../emailService';

/**
 * Scheduled task to send 24-hour reminder emails to webinar registrants
 * This should be run daily (e.g., via cron job or scheduled task)
 */
export async function sendWebinarReminders() {
  console.log('[WebinarReminders] Starting reminder email task...');
  
  try {
    // Calculate the target date (24 hours from now)
    const now = new Date();
    const targetDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
    
    // Webinar date: January 17, 2026
    const webinarDate = new Date('2026-01-17T19:00:00Z'); // 7PM UK time
    
    // Check if webinar is approximately 24 hours away (within a 2-hour window)
    const timeDiff = webinarDate.getTime() - now.getTime();
    const hoursUntilWebinar = timeDiff / (1000 * 60 * 60);
    
    console.log(`[WebinarReminders] Hours until webinar: ${hoursUntilWebinar.toFixed(2)}`);
    
    // Only send reminders if webinar is between 23-25 hours away
    if (hoursUntilWebinar < 23 || hoursUntilWebinar > 25) {
      console.log('[WebinarReminders] Not time to send reminders yet (must be 24h before webinar)');
      return { sent: 0, message: 'Not time to send reminders' };
    }
    
    // Get all registrations that haven't received reminder yet
    const registrations = await getAllWebinarRegistrations();
    const pendingReminders = registrations.filter((reg: any) => !reg.reminderSent);
    
    console.log(`[WebinarReminders] Found ${pendingReminders.length} registrations pending reminder`);
    
    if (pendingReminders.length === 0) {
      console.log('[WebinarReminders] No pending reminders to send');
      return { sent: 0, message: 'No pending reminders' };
    }
    
    let successCount = 0;
    let failureCount = 0;
    
    // Send reminder emails
    for (const registration of pendingReminders) {
      try {
        const result = await sendWebinarReminderEmail(
          registration.email,
          registration.name,
          {
            title: 'Build the Right AI Skillset',
            date: 'Saturday, 17 January 2026',
            time: '7PM UK time, 8PM Nigeria Time',
            zoomLink: 'https://shorturl.at/2yAwE'
          }
        );
        
        if (result.success) {
          // Mark as sent in database
          await markWebinarReminderSent(registration.id);
          successCount++;
          console.log(`[WebinarReminders] ✓ Sent reminder to ${registration.email}`);
        } else {
          failureCount++;
          console.error(`[WebinarReminders] ✗ Failed to send to ${registration.email}:`, result.error);
        }
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        failureCount++;
        console.error(`[WebinarReminders] ✗ Error sending to ${registration.email}:`, error);
      }
    }
    
    console.log(`[WebinarReminders] Task complete: ${successCount} sent, ${failureCount} failed`);
    
    return {
      sent: successCount,
      failed: failureCount,
      total: pendingReminders.length
    };
    
  } catch (error) {
    console.error('[WebinarReminders] Task failed:', error);
    throw error;
  }
}

// Allow running directly from command line for testing
if (import.meta.url === `file://${process.argv[1]}`) {
  sendWebinarReminders()
    .then(result => {
      console.log('Result:', result);
      process.exit(0);
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
}
