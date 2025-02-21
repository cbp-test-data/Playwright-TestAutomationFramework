export class DataGenerator {
    /**
     * Generate a random username
     */
    static generateUsername(): string {
        return `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }

    /**
     * Generate a random password
     * @param length Password length
     */
    static generatePassword(length: number = 10): string {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    }

    /**
     * Generate a random email
     */
    static generateEmail(): string {
        return `test.${Date.now()}_${Math.floor(Math.random() * 1000)}@example.com`;
    }

    /**
     * Generate random user data
     */
    static generateUserData() {
        return {
            username: this.generateUsername(),
            password: this.generatePassword(),
            email: this.generateEmail(),
            firstName: `Test${Date.now()}`,
            lastName: `User${Math.floor(Math.random() * 1000)}`
        };
    }

    /**
     * Generate a date string in YYYY-MM-DD format
     * @param daysFromNow Number of days from today (can be negative)
     */
    static generateDate(daysFromNow: number = 0): string {
        const date = new Date();
        date.setDate(date.getDate() + daysFromNow);
        return date.toISOString().split('T')[0];
    }

    /**
     * Generate a random number between min and max
     */
    static generateNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generate a random boolean value
     */
    static generateBoolean(): boolean {
        return Math.random() >= 0.5;
    }

    /**
     * Generate a random item from an array
     */
    static generateRandomItem<T>(items: T[]): T {
        return items[Math.floor(Math.random() * items.length)];
    }
} 