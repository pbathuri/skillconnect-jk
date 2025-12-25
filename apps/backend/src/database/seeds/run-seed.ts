import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

/**
 * Database Seed Script
 * 
 * Creates sample data for development and testing:
 * - Admin user
 * - Sample bank
 * - Sample training providers
 * - Sample courses
 * - Sample learners and loans
 */
async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USERNAME || 'skillconnect',
    password: process.env.DATABASE_PASSWORD || 'skillconnect_password',
    database: process.env.DATABASE_NAME || 'skillconnect_jk',
    synchronize: true,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  });

  await dataSource.initialize();
  console.log('Database connected for seeding');

  // Hash password
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  const learnerPassword = await bcrypt.hash('Learner@123', 10);

  // Create Admin User
  const adminId = uuidv4();
  await dataSource.query(`
    INSERT INTO users (id, first_name, last_name, email, password_hash, role, status, kyc_status, preferred_language, created_at, updated_at)
    VALUES ($1, 'System', 'Admin', 'admin@skillconnectjk.gov.in', $2, 'admin', 'active', 'verified', 'en', NOW(), NOW())
    ON CONFLICT (email) DO NOTHING
  `, [adminId, passwordHash]);
  console.log('Admin user created');

  // Create Sample Bank
  const bankId = uuidv4();
  await dataSource.query(`
    INSERT INTO banks (id, name, bank_code, status, type, email, phone, head_office_address, city, state, pin_code, mclr_rate, max_loan_amount, min_loan_amount, cgfssd_registered, created_at, updated_at)
    VALUES ($1, 'J&K Bank', 'JKBANK001', 'active', 'psu', 'loans@jkbank.com', '1800-123-4567', 'Corporate Headquarters, Lal Chowk', 'Srinagar', 'Jammu and Kashmir', '190001', 8.5, 150000, 5000, true, NOW(), NOW())
    ON CONFLICT (bank_code) DO NOTHING
  `, [bankId]);
  console.log('Sample bank created');

  // Create Sample Training Provider
  const tpId = uuidv4();
  await dataSource.query(`
    INSERT INTO training_providers (
      id, name, legal_name, registration_number, status, accreditation_type,
      email, phone, address_line1, city, district, state, pin_code,
      bank_account_number, bank_ifsc, bank_name, bank_branch, pan_number,
      completion_rate, certification_rate, placement_rate, tp_score,
      guarantee_deposit_amount, guarantee_deposit_percentage, available_guarantee_balance,
      sectors, created_at, updated_at
    )
    VALUES (
      $1, 'Kashmir IT Academy', 'Kashmir IT Academy Pvt Ltd', 'KITA-001', 'approved', 'nsdc',
      'info@kashmirit.edu', '9876543210', 'Boulevard Road, Near Dal Lake', 'Srinagar', 'Srinagar', 'Jammu and Kashmir', '190001',
      '1234567890123456', 'JAKA0001234', 'J&K Bank', 'Lal Chowk', 'ABCDE1234F',
      85.5, 78.0, 65.0, 76.5,
      500000, 25, 450000,
      '["it_ites", "electronics"]', NOW(), NOW()
    )
    ON CONFLICT (registration_number) DO NOTHING
  `, [tpId]);
  console.log('Sample training provider created');

  // Create Sample Course
  const courseId = uuidv4();
  await dataSource.query(`
    INSERT INTO courses (
      id, name, course_code, description, short_description, status, sector, mode, skill_level,
      duration_weeks, hours_per_week, total_hours, course_fee, registration_fee, exam_fee, material_fee, total_fee,
      min_age, max_age, certification_body, is_ncvet_aligned, job_demand_index,
      batch_size, training_provider_id, curriculum, milestones, created_at, updated_at
    )
    VALUES (
      $1, 'Full Stack Web Development', 'FSWD-001', 
      'Comprehensive course covering modern web development with React, Node.js, and databases. Learn to build production-ready applications.',
      'Learn full stack web development from scratch',
      'active', 'it_ites', 'offline', 'intermediate',
      16, 40, 640, 45000, 1000, 2000, 2000, 50000,
      18, 35, 'NSDC', true, 85,
      30, $2, 
      '[{"moduleId": "1", "moduleName": "HTML/CSS Fundamentals", "durationHours": 40, "sequenceOrder": 1, "milestonePercentage": 10},
        {"moduleId": "2", "moduleName": "JavaScript Programming", "durationHours": 80, "sequenceOrder": 2, "milestonePercentage": 25},
        {"moduleId": "3", "moduleName": "React.js Development", "durationHours": 120, "sequenceOrder": 3, "milestonePercentage": 45},
        {"moduleId": "4", "moduleName": "Node.js & Express", "durationHours": 120, "sequenceOrder": 4, "milestonePercentage": 65},
        {"moduleId": "5", "moduleName": "Database & Deployment", "durationHours": 120, "sequenceOrder": 5, "milestonePercentage": 85},
        {"moduleId": "6", "moduleName": "Capstone Project", "durationHours": 160, "sequenceOrder": 6, "milestonePercentage": 100}]',
      '[{"id": "0", "name": "T0 - Enrollment", "percentage": 0, "disbursementPercentage": 30, "description": "Initial enrollment"},
        {"id": "1", "name": "T1 - 33% Completion", "percentage": 33, "disbursementPercentage": 30, "description": "JavaScript mastery"},
        {"id": "2", "name": "T2 - 66% Completion", "percentage": 66, "disbursementPercentage": 20, "description": "Backend development"},
        {"id": "3", "name": "T3 - Certification", "percentage": 100, "disbursementPercentage": 20, "description": "Project completion"}]',
      NOW(), NOW()
    )
    ON CONFLICT (course_code) DO NOTHING
  `, [courseId, tpId]);
  console.log('Sample course created');

  // Create Sample Learner
  const learnerId = uuidv4();
  await dataSource.query(`
    INSERT INTO users (id, first_name, last_name, email, phone, password_hash, role, status, kyc_status, preferred_language, city, district, state, pin_code, created_at, updated_at)
    VALUES ($1, 'Amir', 'Khan', 'amir.khan@example.com', '+919876543210', $2, 'learner', 'active', 'verified', 'en', 'Srinagar', 'Srinagar', 'Jammu and Kashmir', '190001', NOW(), NOW())
    ON CONFLICT (email) DO NOTHING
  `, [learnerId, learnerPassword]);

  // Create Learner Profile
  await dataSource.query(`
    INSERT INTO learner_profiles (id, user_id, education_level, has_bank_account, income_range, borrower_score, career_goals, preferred_sectors, orientation_completed, created_at, updated_at)
    VALUES ($1, $2, 'graduate', true, '1l_to_3l', 72.5, 'Become a full stack developer', '["it_ites"]', true, NOW(), NOW())
    ON CONFLICT (user_id) DO NOTHING
  `, [uuidv4(), learnerId]);
  console.log('Sample learner created');

  // Create Sample Loan Application
  const loanId = uuidv4();
  await dataSource.query(`
    INSERT INTO loans (
      id, application_number, status, purpose, learner_id, course_id, training_provider_id, bank_id,
      requested_amount, interest_rate, mclr_rate, spread_rate, tenure_months, moratorium_months,
      borrower_score_at_application, tp_score_at_application, risk_category,
      cgfssd_covered, cgfssd_coverage_percentage,
      milestone_progress, course_completion_percentage, attendance_percentage,
      created_at, updated_at
    )
    VALUES (
      $1, 'SCJK' || UPPER(TO_HEX(EXTRACT(EPOCH FROM NOW())::INTEGER)), 'draft', 'course_fee',
      $2, $3, $4, $5,
      50000, 10.0, 8.5, 1.5, 60, 3,
      72.5, 76.5, 'moderate',
      true, 75,
      '[{"milestone": 0, "name": "T0 - Enrollment", "targetPercentage": 0, "actualPercentage": 0, "disbursementPercentage": 30, "status": "pending"},
        {"milestone": 1, "name": "T1 - 33% Completion", "targetPercentage": 33, "actualPercentage": 0, "disbursementPercentage": 30, "status": "pending"},
        {"milestone": 2, "name": "T2 - 66% Completion", "targetPercentage": 66, "actualPercentage": 0, "disbursementPercentage": 20, "status": "pending"},
        {"milestone": 3, "name": "T3 - Certification", "targetPercentage": 100, "actualPercentage": 0, "disbursementPercentage": 20, "status": "pending"}]',
      0, 0,
      NOW(), NOW()
    )
    ON CONFLICT DO NOTHING
  `, [loanId, learnerId, courseId, tpId, bankId]);
  console.log('Sample loan application created');

  await dataSource.destroy();
  console.log('\n✅ Seeding completed successfully!');
  console.log('\nTest Credentials:');
  console.log('  Admin: admin@skillconnectjk.gov.in / Admin@123');
  console.log('  Learner: amir.khan@example.com / Learner@123');
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});

