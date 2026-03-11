import styles from './PasswordStrength.module.css';

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  // Calculate password strength
  const strength = {
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    isLongEnough: password.length >= 8,
  };

  const totalChecks = Object.values(strength).filter(Boolean).length;
  const strengthPercentage = (totalChecks / 5) * 100;

  let strengthLevel: 'weak' | 'fair' | 'good' | 'strong';
  let strengthLabel: string;
  let strengthColor: string;

  if (strengthPercentage <= 20) {
    strengthLevel = 'weak';
    strengthLabel = 'Weak';
    strengthColor = '#f44336'; // red
  } else if (strengthPercentage <= 50) {
    strengthLevel = 'fair';
    strengthLabel = 'Fair';
    strengthColor = '#ff9800'; // orange
  } else if (strengthPercentage <= 80) {
    strengthLevel = 'good';
    strengthLabel = 'Good';
    strengthColor = '#4caf50'; // green
  } else {
    strengthLevel = 'strong';
    strengthLabel = 'Strong';
    strengthColor = '#2196f3'; // blue
  }

  return (
    <div className={styles.passwordStrength}>
      <div className={styles.strengthBar}>
        <div
          className={`${styles.strengthFill} ${styles[strengthLevel]}`}
          style={{ width: `${strengthPercentage}%`, backgroundColor: strengthColor }}
        />
      </div>

      <div className={styles.strengthLabel}>
        Strength: <span style={{ color: strengthColor, fontWeight: 600 }}>{strengthLabel}</span>
      </div>

      {/* Strength Criteria */}
      <div className={styles.checklist}>
        <div className={`${styles.criterion} ${strength.hasLowercase ? styles.met : ''}`}>
          <span>✓</span> Lowercase letter (a-z)
        </div>
        <div className={`${styles.criterion} ${strength.hasUppercase ? styles.met : ''}`}>
          <span>✓</span> Uppercase letter (A-Z)
        </div>
        <div className={`${styles.criterion} ${strength.hasNumbers ? styles.met : ''}`}>
          <span>✓</span> Number (0-9)
        </div>
        <div className={`${styles.criterion} ${strength.hasSpecial ? styles.met : ''}`}>
          <span>✓</span> Special character (!@#$%...)
        </div>
        <div className={`${styles.criterion} ${strength.isLongEnough ? styles.met : ''}`}>
          <span>✓</span> At least 8 characters
        </div>
      </div>
    </div>
  );
}
