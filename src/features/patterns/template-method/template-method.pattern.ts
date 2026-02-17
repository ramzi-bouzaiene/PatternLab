import type { PatternModule } from '@core/types'

export const templateMethodPattern: PatternModule = {
  id: 'template-method',
  name: 'Template Method',
  category: 'behavioral',
  difficulty: 'beginner',
  description:
    'Defines the skeleton of an algorithm in an operation, deferring some steps to subclasses without changing the algorithm\'s structure.',
  whenToUse: [
    'When you want to let clients extend only specific steps of an algorithm',
    'When you have several classes with similar algorithms with minor differences',
    'When you want to control at which points subclasses can extend an algorithm',
    'When the overall structure of an algorithm should remain fixed',
  ],
  whenNotToUse: [
    'When algorithms have very different structures',
    'When you need to change the algorithm skeleton at runtime',
    'When there are many steps that all need to be overridden',
    'When composition would be more flexible than inheritance',
  ],
  badExample: `// ❌ Anti-Pattern: Duplicated algorithm structure
class PDFReportGenerator {
  generate() {
    // 1. Gather data
    const data = this.queryDatabase();

    // 2. Process data (same for all)
    const processed = data.map(d => ({ ...d, timestamp: Date.now() }));

    // 3. Format as PDF
    const formatted = this.formatAsPDF(processed);

    // 4. Save (same for all)
    this.saveToDisk(formatted);
  }
}

class HTMLReportGenerator {
  generate() {
    // 1. Gather data (duplicated)
    const data = this.queryDatabase();

    // 2. Process data (duplicated)
    const processed = data.map(d => ({ ...d, timestamp: Date.now() }));

    // 3. Format as HTML (different)
    const formatted = this.formatAsHTML(processed);

    // 4. Save (duplicated)
    this.saveToDisk(formatted);
  }
}
// Common steps duplicated in every class!`,
  goodExample: `// ✅ Best Practice: Template Method Pattern
abstract class ReportGenerator {
  // Template method - defines the algorithm skeleton
  generate(): void {
    const data = this.gatherData();
    const processed = this.processData(data);
    const formatted = this.formatReport(processed);
    this.saveReport(formatted);
    this.notifyComplete();
  }

  // Common implementation
  protected processData(data: any[]): any[] {
    return data.map(d => ({
      ...d,
      timestamp: Date.now(),
      processed: true,
    }));
  }

  // Common implementation
  protected saveReport(content: string): void {
    console.log('Saving report...');
    // Common save logic
  }

  // Hook - optional override
  protected notifyComplete(): void {
    // Default: do nothing
  }

  // Abstract methods - must be implemented by subclasses
  protected abstract gatherData(): any[];
  protected abstract formatReport(data: any[]): string;
}

class PDFReportGenerator extends ReportGenerator {
  protected gatherData(): any[] {
    console.log('Querying database for PDF report...');
    return [{ id: 1, value: 'data' }];
  }

  protected formatReport(data: any[]): string {
    console.log('Formatting as PDF...');
    return \`<PDF>\${JSON.stringify(data)}</PDF>\`;
  }
}

class HTMLReportGenerator extends ReportGenerator {
  protected gatherData(): any[] {
    console.log('Fetching API data for HTML report...');
    return [{ id: 2, value: 'api-data' }];
  }

  protected formatReport(data: any[]): string {
    console.log('Formatting as HTML...');
    return \`<html><body>\${JSON.stringify(data)}</body></html>\`;
  }

  // Override hook
  protected notifyComplete(): void {
    console.log('Sending email notification...');
  }
}

// Usage
const pdfReport = new PDFReportGenerator();
pdfReport.generate();

const htmlReport = new HTMLReportGenerator();
htmlReport.generate();`,
  diagram: {
    nodes: [
      {
        id: 'abstract-class',
        type: 'class',
        label: 'AbstractClass',
        position: { x: 280, y: 30 },
        size: { width: 200, height: 120 },
        methods: ['+templateMethod()', '#step1()', '#step2()', '#hook()'],
      },
      {
        id: 'concrete-a',
        type: 'class',
        label: 'ConcreteClassA',
        position: { x: 120, y: 220 },
        size: { width: 160, height: 80 },
        methods: ['+step1()', '+step2()'],
      },
      {
        id: 'concrete-b',
        type: 'class',
        label: 'ConcreteClassB',
        position: { x: 480, y: 220 },
        size: { width: 160, height: 80 },
        methods: ['+step1()', '+step2()', '+hook()'],
      },
    ],
    edges: [
      { id: 'e1', source: 'concrete-a', target: 'abstract-class', type: 'inheritance' },
      { id: 'e2', source: 'concrete-b', target: 'abstract-class', type: 'inheritance' },
    ],
    viewport: { width: 750, height: 350 },
  },
  relatedPatterns: ['strategy', 'factory', 'hook'],
  tags: ['behavioral', 'gang-of-four', 'inheritance', 'algorithm'],
}
