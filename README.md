# UpskillinTech

![UpskillinTech Logo](https://upskillintech.com/logo.png)

> AI transformation ecosystem offering education, consultancy, community, and business tools to help individuals and organizations adopt AI, automate workflows, and upskill teams.

## 🌟 About UpskillinTech

UpskillinTech is a comprehensive platform designed to empower small business owners, professionals, and organizations to harness the power of AI. We bridge the gap between AI innovation and practical implementation, making cutting-edge technology accessible to everyone.

### Our Mission

To democratize AI education and adoption by providing:
- Practical AI training and upskilling programs
- Consultancy services for AI integration
- Community-driven learning and support
- Business tools and automation solutions

## 🚀 Key Features

### Education & Training
- **AI Fundamentals**: Comprehensive courses on AI basics, machine learning, and practical applications
- **Hands-on Workshops**: Interactive sessions covering AI tools and implementation strategies
- **Children's Robotics**: Specialized programs for ages 6-12 introducing robotics and AI concepts
- **Professional Upskilling**: Career-focused training for tech professionals

### Consultancy Services
- AI adoption strategy development
- Workflow automation consulting
- Custom AI solution design
- Technical implementation support

### Community Hub
- Networking opportunities with AI practitioners
- Knowledge sharing and collaborative learning
- Regular webinars and tech talks
- Global AI learning community support

### Business Tools
- AI-powered automation workflows
- Integration with popular platforms (n8n, Make, Zapier)
- Custom solutions for business challenges
- From idea validation to product deployment

## 🛠️ Tech Stack

- **Frontend**: TypeScript, React, Vite
- **Backend**: Node.js, Express
- **Database**: PostgreSQL, Drizzle ORM
- **Email**: SendGrid integration
- **Automation**: n8n workflows
- **Deployment**: Hostinger
- **AI Tools**: Google AI Studio, Various LLMs

## 📦 Project Structure

```
upskillintech/
├── client/          # Frontend React application
├── server/          # Backend Node.js API
├── shared/          # Shared types and utilities
├── scripts/         # Build and deployment scripts
├── blog-articles/   # Educational content and articles
└── patches/         # Package patches and fixes
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Amynwabu/upskillintech.git
cd upskillintech
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database:
```bash
pnpm db:push
```

5. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000` by default (or the
next available port).

### Webinar registration system

The reusable AI Employee webinar landing page, consent-aware registration,
calendar integration and scheduled SendGrid reminders are documented in
[`docs/WEBINARS.md`](./docs/WEBINARS.md). The initial webinar is seeded as a
draft so an unconfirmed date is never presented as a real event.

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./docs/contributing.md)

## 🎯 Roadmap

- [x] Core platform development
- [x] Blog and content management system
- [x] Email automation with SendGrid
- [x] Course detail pages
- [ ] Payment integration
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] AI-powered chatbot assistant

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](./docs/contributing.md) before submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Contact & Support

- **Website**: [upskillintech.com](https://upskillintech.com)
- **Email**: support@upskillintech.com
- **YouTube**: [@UpskillinTech](https://youtube.com/@upskillintech)
- **TikTok**: [@upskillintech](https://tiktok.com/@upskillintech)
- **Instagram**: [@upskillintech](https://instagram.com/upskillintech)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Cranfield University for research collaboration
- All contributors and community members

## 🌍 Our Impact

- **Students Trained**: 500+
- **Organizations Served**: 50+
- **Community Members**: 1000+
- **Countries Reached**: 20+

---

**Made with ❤️ by the UpskillinTech Team**

*Empowering the future, one skill at a time.*
