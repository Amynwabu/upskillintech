# UpskillinTech Navigation Menu

**Status:** ACTIVE - New Structure

**Last Updated:** March 13, 2026

**Based on:** Exported pages from https://upskillai-acujws9f.manus.space/

---

## Primary Navigation (Header)

### Main Menu Items

```
Home  |  Programs  |  Enterprise  |  Community  |  About  |  Resources ▼  |  [Join Program]
```

### Detailed Structure

#### 1. **Home**
- **URL:** `/`
- **Page:** HOME.md
- **Type:** Link
- **Description:** Landing page with hero, programs overview, workflows

#### 2. **Programs**
- **URL:** `/programs`
- **Page:** PROGRAMS.md
- **Type:** Link
- **Description:** All training programs
- **Sub-sections on page:**
  - AI-Enabled Professional (flagship)
  - AI Foundations (beginner)
  - AI Leadership (for leaders)
  - Webinars & Masterclasses

#### 3. **Enterprise**
- **URL:** `/enterprise`
- **Page:** ENTERPRISE.md
- **Type:** Link
- **Description:** B2B solutions and corporate training
- **Sub-sections on page:**
  - AI Productivity Training
  - AI Strategy Workshops
  - AI Workflow Implementation

#### 4. **Community**
- **URL:** `/community`
- **Page:** COMMUNITY.md
- **Type:** Link
- **Description:** Community hub, events, networking
- **Sub-sections on page:**
  - Monthly Masterclasses
  - Events & Webinars
  - Peer Network

#### 5. **About**
- **URL:** `/about`
- **Page:** ABOUT.md
- **Type:** Link
- **Description:** Mission, founder, partnerships
- **Sub-sections on page:**
  - Our Mission
  - Dr. Amaka Adiuku (Founder)
  - Our Vision
  - Partnerships

#### 6. **Resources** (Dropdown)
- **Type:** Dropdown Menu
- **Icon:** Down arrow (▼)
- **Sub-menu items:**

  **6.1. Blog & Insights**
  - **URL:** `/resources/blog`
  - **Page:** RESOURCES_BLOG.md
  - **Description:** AI articles and insights (40+ articles)

  **6.2. AI Guides**
  - **URL:** `/resources/ai-guides`
  - **Page:** RESOURCES_AI_GUIDES.md
  - **Description:** Downloadable guides and prompts (12+ guides)

  **6.3. Case Studies**
  - **URL:** `/resources/case-studies`
  - **Page:** RESOURCES_CASE_STUDIES.md
  - **Description:** Real-world success stories

  **6.4. Webinars**
  - **URL:** `/resources/webinars`
  - **Page:** RESOURCES_WEBINARS.md
  - **Description:** Live and recorded sessions (20+ recordings)

  **6.5. AI Workflow Library**
  - **URL:** `/resources/workflows`
  - **Page:** RESOURCES_WORKFLOWS.md
  - **Description:** Step-by-step workflows (15+ templates)

#### 7. **Join Program** (CTA Button)
- **URL:** `/programs` or specific program anchor
- **Type:** Button (Primary CTA)
- **Style:** Green button
- **Description:** Main conversion action

---

## Footer Navigation

### Footer Menu Structure

#### Column 1: Programs
- AI-Enabled Professional → `/programs#ai-enabled-professional`
- AI Foundations → `/programs#ai-foundations`
- AI Leadership → `/programs#ai-leadership`
- Enterprise Training → `/enterprise`

#### Column 2: Community
- Join Community → `/community`
- Events & Webinars → `/community#events`
- AI Masterclasses → `/community#masterclasses`
- Peer Network → `/community`

#### Column 3: Resources
- Blog & Insights → `/resources/blog`
- AI Guides → `/resources/ai-guides`
- Case Studies → `/resources/case-studies`
- Webinars → `/resources/webinars`
- AI Workflow Library → `/resources/workflows`

#### Column 4: About
- About UpskillinTech → `/about`
- Our Approach → `/#solution` or `/about#approach`
- Contact Us → `/contact`
- Careers → `/#careers` or `/about#careers`

### Footer Legal Links
- Privacy Policy → `/#privacy` or `/privacy`
- Terms of Service → `/#terms` or `/terms`
- Cookie Policy → `/#cookies` or `/cookies`

### Social Media Links
- LinkedIn
- YouTube
- Instagram
- Twitter/X

---

## Complete Page Inventory

### Total Pages: 11

1. ✅ HOME.md - `/`
2. ⏳ PROGRAMS.md - `/programs`
3. ⏳ ENTERPRISE.md - `/enterprise`
4. ⏳ COMMUNITY.md - `/community`
5. ⏳ ABOUT.md - `/about`
6. ⏳ RESOURCES.md - `/resources` (hub page)
7. ⏳ RESOURCES_BLOG.md - `/resources/blog`
8. ⏳ RESOURCES_AI_GUIDES.md - `/resources/ai-guides`
9. ⏳ RESOURCES_CASE_STUDIES.md - `/resources/case-studies`
10. ⏳ RESOURCES_WEBINARS.md - `/resources/webinars`
11. ⏳ RESOURCES_WORKFLOWS.md - `/resources/workflows`

**Legend:**
- ✅ = Exported to GitHub
- ⏳ = To be exported

---

## Implementation Notes

### For Manus Platform

1. **Main Navigation Bar**
   - Position: Fixed header
   - Items: Home, Programs, Enterprise, Community, About, Resources (dropdown)
   - CTA Button: "Join Program" (green, prominent)

2. **Resources Dropdown**
   - Trigger: Click or hover
   - Items: 5 sub-pages listed
   - Style: Clean dropdown with icons

3. **Mobile Navigation**
   - Hamburger menu
   - Full-screen overlay or side drawer
   - Same structure, collapsed

4. **Footer**
   - 4-column layout (desktop)
   - Stacked on mobile
   - Social icons prominent
   - Legal links at bottom

### URL Structure

```
Pattern: /[page]
Pattern: /resources/[sub-page]
Pattern: /[page]#[anchor]

Examples:
/
/programs
/programs#ai-enabled-professional
/enterprise
/community
/about
/resources
/resources/blog
/resources/ai-guides
/resources/case-studies
/resources/webinars
/resources/workflows
```

---

## Migration Path

### From Old to New Menu

1. **Backup current menu** → See NAVIGATION_MENU_OLD.md
2. **Update Manus navigation settings** with this structure
3. **Test all links** and dropdowns
4. **Verify mobile responsive** behavior
5. **Update footer** with new structure
6. **Deploy to production**

### Rollback Plan

If issues arise:
1. Restore from NAVIGATION_MENU_OLD.md
2. Revert Manus navigation settings
3. Test and redeploy

---

## Related Files

- [Exported Pages](./exported-pages/) - All page content
- [Homepage Redesign](./HOMEPAGE_REDESIGN.md) - Design specs
- [Old Navigation Menu](./NAVIGATION_MENU_OLD.md) - Backup

---

## Changelog

### Version 1.0 - March 13, 2026
- Initial navigation structure based on exported Manus pages
- 11 total pages defined
- Resources dropdown with 5 sub-pages
- Complete footer structure
- Implementation notes for Manus platform
