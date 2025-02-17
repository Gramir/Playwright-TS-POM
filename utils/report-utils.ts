import { TestInfo } from '@playwright/test';

export class ReportUtils {
    static async addTestMetadata(testInfo: TestInfo, metadata: Record<string, any>) {
        testInfo.annotations.push({
            type: 'metadata',
            description: JSON.stringify(metadata)
        });
    }

    static getTestStatus(testInfo: TestInfo): string {
        if (testInfo.status === testInfo.expectedStatus) {
            return 'passed';
        }
        if (testInfo.status === 'failed') {
            return 'failed';
        }
        return 'skipped';
    }

    static async captureScreenshotOnFailure(testInfo: TestInfo) {
        if (testInfo.status !== testInfo.expectedStatus) {
            const screenshot = await testInfo.attachments.find(attachment => attachment.name === 'screenshot');
            if (screenshot) {
                await testInfo.attach('failure-screenshot', {
                    path: screenshot.path,
                    contentType: 'image/png'
                });
            }
        }
    }
}