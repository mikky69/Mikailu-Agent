import { Download, FileText, Github, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function ProjectExport() {
  const generateReadmeContent = () => {
    return `# Mikailu Agent - Autonomous On-Chain AI Trading Agent

![Mikailu Agent Logo](./assets/generated/mikailu-agent-logo.dim_200x200.png)

[![Built on ICP](https://img.shields.io/badge/Built%20on-Internet%20Computer-3B00B9?style=for-the-badge&logo=internet-computer)](https://internetcomputer.org/)
[![AI Agent](https://img.shields.io/badge/AI-Agent-00D4FF?style=for-the-badge&logo=openai)](https://github.com)
[![Cross-chain](https://img.shields.io/badge/Cross--chain-Automation-FF6B6B?style=for-the-badge&logo=ethereum)](https://github.com)

## Overview

Mikailu Agent is an autonomous AI canister that demonstrates automated decision-making and cross-chain interaction capabilities on the Internet Computer. The application showcases simulated AI trading logic and multi-blockchain connectivity through educational examples with clear, beginner-friendly transparency.

This project is designed as an educational tool to demonstrate:
- **Autonomous AI decision-making** on the Internet Computer
- **Cross-chain integration concepts** using ICP Chain Fusion capabilities
- **Real-time monitoring** of AI trading decisions
- **Multi-blockchain support** (ICP, Ethereum, Bitcoin, Solana)

![Dashboard Preview](./assets/generated/dashboard-preview.dim_600x400.png)

## Features

### 🤖 Autonomous AI Engine
- Simulated AI decision-making logic that evaluates market conditions
- Automated execution based on predefined rules and thresholds
- Decision history tracking with timestamps and reasoning
- Configurable automation parameters (risk tolerance, trade frequency)

### 🔗 Cross-Chain Integration (Simulated)
- Chain selection: ICP, Ethereum, Bitcoin, and Solana
- Mock cross-chain transaction displays
- Simulated wallet balance tracking across multiple chains
- Educational examples of ICP Chain Fusion capabilities

![Cross-Chain Network](./assets/generated/cross-chain-network.dim_800x400.png)

### 📊 User Dashboard
- Real-time visualization of AI decision processes
- Interactive controls to start/stop autonomous operations
- Mock wallet management interface
- Configuration panel for AI parameters

### 🔍 Transparency Panel
- Comprehensive logging of all AI decisions
- Historical view of simulated trades
- Cross-chain interaction logs
- Performance metrics and decision accuracy tracking

## Technology Stack

**Frontend:**
- React 19 + TypeScript
- TanStack Query for state management
- Tailwind CSS + shadcn/ui components
- Lucide React icons

**Backend:**
- Motoko (Internet Computer)
- Autonomous canister with timer-based execution
- Cross-chain simulation logic

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) (v0.15.0 or higher)
- [pnpm](https://pnpm.io/) package manager

### Local Setup and Testing

1. **Clone the repository:**
\`\`\`bash
git clone <your-repo-url>
cd mikailu-agent
\`\`\`

2. **Install dependencies:**
\`\`\`bash
cd frontend
pnpm install
\`\`\`

3. **Start the local Internet Computer replica:**
\`\`\`bash
dfx start --clean --background
\`\`\`

4. **Deploy the canisters locally:**
\`\`\`bash
dfx deploy
\`\`\`

5. **Start the development server:**
\`\`\`bash
cd frontend
pnpm start
\`\`\`

6. **Open your browser:**
Navigate to \`http://localhost:3000\` to see the application.

### Deployment to Internet Computer Mainnet

1. **Ensure you have cycles:**
You'll need ICP tokens converted to cycles to deploy on mainnet. Get cycles from the [NNS Dapp](https://nns.ic0.app/).

2. **Deploy to mainnet:**
\`\`\`bash
dfx deploy --network ic
\`\`\`

3. **Access your deployed canister:**
After deployment, dfx will provide you with a canister URL like:
\`\`\`
https://<canister-id>.ic0.app
\`\`\`

### Linking to GitHub

1. **Create a new repository on GitHub**

2. **Initialize git and push:**
\`\`\`bash
git init
git add .
git commit -m "Initial commit: Mikailu Agent"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
\`\`\`

3. **Update the GitHub link in the app:**
Edit \`frontend/src/components/Header.tsx\` and update the GitHub URL:
\`\`\`typescript
<a href="https://github.com/your-username/mikailu-agent" ...>
\`\`\`

## Project Structure

\`\`\`
mikailu-agent/
├── backend/
│   └── main.mo              # Motoko backend canister
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/
│   │   └── assets/          # Static assets
│   └── package.json
├── dfx.json                 # DFX configuration
└── README.md
\`\`\`

## Configuration

### AI Parameters

You can configure the AI agent's behavior through the Control Panel:

- **Risk Tolerance:** 1-10 scale (higher = more aggressive)
- **Trade Frequency:** 1-10 scale (higher = more frequent trades)
- **Preferred Chain:** Select which blockchain to simulate trading on
- **Auto-Trading:** Enable/disable autonomous operation

### Environment Variables

Create a \`.env\` file in the frontend directory:

\`\`\`env
VITE_DFX_NETWORK=local
VITE_BACKEND_CANISTER_ID=<your-canister-id>
\`\`\`

## Educational Purpose

⚠️ **Important:** This application uses **simulated trading logic** and does not interact with real financial markets or execute real trades. It is designed purely for educational purposes to demonstrate:

- How autonomous canisters work on the Internet Computer
- Potential use cases for AI-driven decision making on-chain
- Cross-chain integration concepts using ICP Chain Fusion
- Best practices for building transparent AI systems

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Built with ❤️ using [caffeine.ai](https://caffeine.ai)

## Resources

- [Internet Computer Documentation](https://internetcomputer.org/docs)
- [Motoko Programming Language](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [ICP Chain Fusion](https://internetcomputer.org/docs/current/developer-docs/integrations/chain-fusion)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Support

For questions and support, please open an issue on GitHub or reach out to the community:
- [Internet Computer Forum](https://forum.dfinity.org/)
- [ICP Developer Discord](https://discord.gg/jnjVVQaE2C)

---

**Disclaimer:** This is a demonstration project for educational purposes. Do not use this code for actual financial trading without proper modifications, testing, and regulatory compliance.
`;
  };

  const handleDownloadReadme = () => {
    const content = generateReadmeContent();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded successfully');
  };

  const handleCopyReadme = async () => {
    const content = generateReadmeContent();
    try {
      await navigator.clipboard.writeText(content);
      toast.success('README content copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const projectInfo = {
    name: 'Mikailu Agent',
    version: '1.0.0',
    description: 'Autonomous On-Chain AI Trading Agent',
    technologies: ['React', 'TypeScript', 'Motoko', 'Internet Computer', 'Tailwind CSS'],
    features: [
      'Autonomous AI decision-making',
      'Cross-chain integration (simulated)',
      'Real-time monitoring dashboard',
      'Multi-blockchain support',
      'Transparent decision logging'
    ]
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Project Export
            </CardTitle>
            <CardDescription>
              Download project documentation and setup instructions
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            v{projectInfo.version}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Project Information</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Name:</strong> {projectInfo.name}</p>
              <p><strong>Description:</strong> {projectInfo.description}</p>
            </div>
          </div>

          <Separator />

          {/* Technologies */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {projectInfo.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Key Features */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Key Features</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {projectInfo.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Download Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Documentation</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={handleDownloadReadme}
              className="w-full"
              variant="default"
            >
              <Download className="w-4 h-4 mr-2" />
              Download README.md
            </Button>

            <Button
              onClick={handleCopyReadme}
              className="w-full"
              variant="outline"
            >
              <FileText className="w-4 h-4 mr-2" />
              Copy README
            </Button>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="flex items-start gap-2 text-sm">
              <Github className="w-4 h-4 mt-0.5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="font-medium">GitHub Setup</p>
                <p className="text-xs text-muted-foreground">
                  The README includes complete instructions for:
                </p>
                <ul className="text-xs text-muted-foreground space-y-0.5 ml-4">
                  <li>• Local development setup with dfx</li>
                  <li>• Deployment to IC mainnet</li>
                  <li>• GitHub repository integration</li>
                  <li>• Project structure overview</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Note:</strong> To create a complete project archive, 
              manually copy all source files from your local development environment. The README provides 
              detailed instructions for setting up the project from scratch.
            </p>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Quick Start Commands</h3>
          <div className="space-y-2">
            <div className="p-3 bg-muted rounded-md">
              <p className="text-xs font-mono text-muted-foreground mb-1">Local Development:</p>
              <code className="text-xs font-mono">dfx start --clean --background && dfx deploy</code>
            </div>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-xs font-mono text-muted-foreground mb-1">Mainnet Deployment:</p>
              <code className="text-xs font-mono">dfx deploy --network ic</code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
