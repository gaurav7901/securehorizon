
interface TourStep {
  title: string;
  description: string;
  route: string;
  narration: string;
}

export const tourScript: TourStep[] = [
  {
    title: "Welcome to CyberHorizon",
    route: "/",
    description: "An enterprise security dashboard for AWS infrastructure",
    narration: "Hello and welcome to CyberHorizon, our enterprise-grade security dashboard for AWS cloud infrastructure. In today's rapidly evolving threat landscape, maintaining visibility and control over your cloud security posture is crucial. CyberHorizon was built to address this exact challenge, providing real-time monitoring, threat detection, and compliance management all in one place."
  },
  {
    title: "Key Features",
    route: "/",
    description: "Explore our comprehensive security features",
    narration: "CyberHorizon offers a comprehensive suite of security tools. Our core features include automated security scanning across services like IAM, S3, EC2, and RDS to detect misconfigurations before they become vulnerabilities. The real-time alerting system notifies your team through multiple channels when security issues arise. We've built in templates for major compliance frameworks including CIS, NIST, and SOC 2, saving your team countless hours of manual work. The platform also supports automated remediation, allowing you to fix issues with a single click in many cases."
  },
  {
    title: "Security Section",
    route: "/",
    description: "Enterprise-grade security for your AWS infrastructure",
    narration: "Our security features are designed to provide enterprise-grade protection. The platform includes role-based access control with granular permissions, cross-account access to securely scan multiple AWS accounts, custom security rules defined in JSON or YAML, and built-in compliance frameworks. In 2019, Capital One suffered a major breach when an attacker exploited a misconfigured web application firewall in their AWS environment. CyberHorizon would have flagged this misconfiguration immediately, potentially preventing the entire incident."
  },
  {
    title: "Main Dashboard",
    route: "/dashboard",
    description: "Central view of your security posture",
    narration: "Now let's look at the main dashboard, which provides a holistic view of your security posture. The security score card gives you an at-a-glance understanding of your overall security health - currently at 72%, showing an improvement of 4% since our last scan. Below, you can see findings categorized by severity - we currently have 2 critical, 5 high, 12 medium, and 8 low-severity issues that need attention. The AWS connection panel shows our integration status - when properly configured, CyberHorizon pulls data directly from your AWS environment using secure, least-privilege IAM roles."
  },
  {
    title: "Recent Findings",
    route: "/dashboard",
    description: "Latest detected security issues",
    narration: "The Recent Findings section highlights the most important security issues discovered in your environment. For example, we've detected a publicly accessible S3 bucket - a common misconfiguration that has led to major data breaches. Organizations increasingly find their AWS resources hijacked for cryptocurrency mining due to exposed access keys. CyberHorizon continuously monitors for exposed credentials in public repositories and unusual resource utilization that might indicate crypto mining activities."
  },
  {
    title: "Security Findings",
    route: "/dashboard/findings",
    description: "Detailed view of all security issues",
    narration: "The Findings page is where security professionals spend most of their time. Here we can see all detected issues sorted by severity. Each finding provides detailed information about the affected resource, along with a remediation path. The filtering system allows you to focus on specific services or severity levels, making it easy to prioritize your team's response efforts. For instance, focusing on IAM findings first is a best practice since identity issues often have the widest potential impact."
  },
  {
    title: "Alerts System",
    route: "/dashboard/alerts",
    description: "Real-time security notifications",
    narration: "Beyond findings, CyberHorizon provides several other crucial capabilities. The Alerts section shows real-time notifications of suspicious activities, like unusual login attempts from unrecognized IP addresses. Modern ransomware attacks often target cloud backups, so our dashboard monitors backup policies and encryption settings to ensure your disaster recovery capabilities remain intact even if attackers gain access to your environment."
  },
  {
    title: "Compliance Dashboard",
    route: "/dashboard/compliance",
    description: "Track regulatory compliance",
    narration: "The Compliance dashboard tracks your progress against specific frameworks like PCI-DSS or HIPAA, depending on your industry requirements. A healthcare company was recently fined 1.5 million dollars for HIPAA violations after patient data was stored in improperly secured S3 buckets. Our compliance templates would have identified these issues during routine scans, preventing both the exposure and the resulting penalties."
  },
  {
    title: "Final Thoughts",
    route: "/dashboard",
    description: "Transform your cloud security posture",
    narration: "CyberHorizon transforms cloud security from a reactive scramble into a proactive, manageable process. By centralizing your security information, automating routine checks, and providing clear remediation paths, we help your team focus on what matters most. Getting started is simple - just connect your AWS accounts using our secure integration process, and you'll have actionable insights within minutes. Thank you for taking this tour of CyberHorizon. For more information or to schedule a personalized demo, please contact our support team."
  }
];
