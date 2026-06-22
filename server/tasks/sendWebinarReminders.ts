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
    
    // Master Class sessions — last two Saturdays of July 2026
    const sessions = [
      { date: new Date('2026-07-18T13:00:00Z'), label: 'Saturday, 18 July 2026', shortDate: '18 July 2026' },
      { date: new Date('2026-07-25T13:00:00Z'), label: 'Saturday, 25 July 2026', shortDate: '25 July 2026' },
    ];

    const upcomingSession = sessions.find((s) => {
      const hoursUntil = (s.date.getTime() - now.getTime()) / (1000 * 60 * 60);
      return hoursUntil >= 23 && hoursUntil <= 25;
    });

    if (!upcomingSession) {
      console.log('[WebinarReminders] Not time to send reminders yet (must be 24h before a session)');
      return { sent: 0, message: 'Not time to send reminders' };
    }

    console.log(`[WebinarReminders] Sending reminders for session: ${upcomingSession.label}`);

    // Get registrations for this specific session that haven't had a reminder
    const registrations = await getAllWebinarRegistrations();
    const pendingReminders = registrations.filter(
      (reg: any) => !reg.reminderSent && reg.webinarDate?.includes(upcomingSession.shortDate)
    );
    
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
            title: 'Build, Brand & Grow with AI — AI Transformation Master Class',
            date: upcomingSession.label,
            time: '2PM – 4PM UK / Nigeria Time',
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
