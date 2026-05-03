import { logger } from '../utils/logger';

export class FeatureAdder {
    async addFeature(featureName: string, featureType: string): Promise<string> {
        logger.info(`Adding feature: ${featureName}`);
        const template = this.generateFeatureTemplate(featureName, featureType);
        return template;
    }

    private generateFeatureTemplate(name: string, type: string): string {
        switch (type.toLowerCase()) {
            case 'component':
                return this.generateComponent(name);
            case 'service':
                return this.generateService(name);
            case 'test':
                return this.generateTest(name);
            default:
                return '// New feature template';
        }
    }

    private generateComponent(name: string): string {
        return `import React from 'react';

interface ${name}Props {
  // Define props
}

export const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div className="${name.toLowerCase()}">
      {/* Component content */}
    </div>
  );
};`;
    }

    private generateService(name: string): string {
        return `import axios from 'axios';

export class ${name}Service {
  private baseURL = process.env.REACT_APP_API_URL;

  async fetch() {
    try {
      const response = await axios.get(\`\${this.baseURL}/api\`);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}`;
    }

    private generateTest(name: string): string {
        return `import { describe, it, expect } from '@jest/globals';

describe('${name}', () => {
  it('should work correctly', () => {
    expect(true).toBe(true);
  });
});`;
    }
}
