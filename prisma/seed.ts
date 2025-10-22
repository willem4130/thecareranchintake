import { PrismaClient, QuestionType, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@thecareranch.com' },
    update: {},
    create: {
      email: 'admin@thecareranch.com',
      name: 'Admin User',
      role: UserRole.ADMIN,
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create the main form
  const form = await prisma.form.upsert({
    where: { id: 'care-ranch-intake' },
    update: {},
    create: {
      id: 'care-ranch-intake',
      title: 'The Care Ranch Leadership Retreat - Intake Form',
      description:
        'Thank you for your commitment to join us for a 5-day immersive journey in Tubac, Arizona. This intake form helps us understand how you think about yourself, how you approach challenges and opportunities, and which areas of your personal leadership you most want to strengthen.',
      isActive: true,
    },
  });

  console.log('✅ Created form:', form.title);

  // Page 1: Welcome & Personal Details
  const page1 = await prisma.formPage.create({
    data: {
      formId: form.id,
      title: 'Welcome',
      description:
        'Thank you for your commitment to this transformative journey. This form helps us tailor the retreat to your unique needs and aspirations.',
      order: 1,
    },
  });

  const section1 = await prisma.formSection.create({
    data: {
      pageId: page1.id,
      title: 'Personal Details',
      description: 'Basic information to help us connect with you.',
      order: 1,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        sectionId: section1.id,
        text: 'Name',
        type: QuestionType.SHORT_TEXT,
        order: 1,
        required: true,
      },
      {
        sectionId: section1.id,
        text: 'Date of birth',
        type: QuestionType.DATE,
        order: 2,
        required: true,
      },
      {
        sectionId: section1.id,
        text: 'Address',
        type: QuestionType.SHORT_TEXT,
        order: 3,
        required: false,
      },
      {
        sectionId: section1.id,
        text: 'Postal code',
        type: QuestionType.SHORT_TEXT,
        order: 4,
        required: false,
      },
      {
        sectionId: section1.id,
        text: 'City',
        type: QuestionType.SHORT_TEXT,
        order: 5,
        required: true,
      },
      {
        sectionId: section1.id,
        text: 'Country',
        type: QuestionType.SHORT_TEXT,
        order: 6,
        required: true,
      },
      {
        sectionId: section1.id,
        text: 'Phone number',
        type: QuestionType.PHONE,
        order: 7,
        required: true,
      },
      {
        sectionId: section1.id,
        text: 'Email address',
        type: QuestionType.EMAIL,
        order: 8,
        required: true,
      },
      {
        sectionId: section1.id,
        text: 'General practitioner',
        type: QuestionType.SHORT_TEXT,
        order: 9,
        required: false,
        description: 'Name and contact information of your doctor',
      },
    ],
  });

  console.log('✅ Created page 1: Welcome & Personal Details');

  // Page 2: Training Goals & Self-Awareness
  const page2 = await prisma.formPage.create({
    data: {
      formId: form.id,
      title: 'Training Goals & Self-Awareness',
      description:
        "Let's explore your inner landscape - your motivations, strengths, and areas for growth.",
      order: 2,
    },
  });

  const section2 = await prisma.formSection.create({
    data: {
      pageId: page2.id,
      title: 'Self-Reflection',
      description: 'These questions help us understand how you perceive yourself and your journey.',
      order: 1,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        sectionId: section2.id,
        text: 'What prompted you to participate in this training?',
        type: QuestionType.LONG_TEXT,
        order: 1,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'What is your current mood state? What three words best describe your current mood/state?',
        type: QuestionType.LONG_TEXT,
        order: 2,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'Name at least two positive qualities you believe you have.',
        type: QuestionType.LONG_TEXT,
        order: 3,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'What would you most like to see happen in your life?',
        type: QuestionType.LONG_TEXT,
        order: 4,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'Which aspects of yourself (as you currently perceive them) do you like the least?',
        type: QuestionType.LONG_TEXT,
        order: 5,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'Which aspects of yourself do you like the most?',
        type: QuestionType.LONG_TEXT,
        order: 6,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'Which achievements are you proud of?',
        type: QuestionType.LONG_TEXT,
        order: 7,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'What brings you intense joy?',
        type: QuestionType.LONG_TEXT,
        order: 8,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'What do you feel ashamed of?',
        type: QuestionType.LONG_TEXT,
        order: 9,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'What is your greatest fear?',
        type: QuestionType.LONG_TEXT,
        order: 10,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'Which losses or painful experiences have been significant for you?',
        type: QuestionType.LONG_TEXT,
        order: 11,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'What values or principles guide your most important life decisions?',
        type: QuestionType.LONG_TEXT,
        order: 12,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'What do you believe others most misunderstand about you?',
        type: QuestionType.LONG_TEXT,
        order: 13,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'Do you suffer from any addictions? If yes, which ones?',
        type: QuestionType.LONG_TEXT,
        order: 14,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'Which important matters do you continuously postpone? Or which choices do you avoid?',
        type: QuestionType.LONG_TEXT,
        order: 15,
        required: false,
      },
      {
        sectionId: section2.id,
        text: 'What is your biggest concern right now?',
        type: QuestionType.LONG_TEXT,
        order: 16,
        required: false,
      },
    ],
  });

  console.log('✅ Created page 2: Training Goals & Self-Awareness');

  // Page 3: Relationships & Family
  const page3 = await prisma.formPage.create({
    data: {
      formId: form.id,
      title: 'Relationships & Family',
      description:
        'Understanding your relational patterns helps us support your interpersonal growth.',
      order: 3,
    },
  });

  const section3 = await prisma.formSection.create({
    data: {
      pageId: page3.id,
      title: 'Relationships',
      description: 'Your connections with family, partners, and friends.',
      order: 1,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        sectionId: section3.id,
        text: 'Describe your relationship with your parents.',
        type: QuestionType.LONG_TEXT,
        order: 1,
        required: false,
      },
      {
        sectionId: section3.id,
        text: 'Do you have siblings? If yes, what is your position in your family (oldest, middle, youngest child)? How is your relationship with them?',
        type: QuestionType.LONG_TEXT,
        order: 2,
        required: false,
      },
      {
        sectionId: section3.id,
        text: "In your parents' eyes, what kind of person are you?",
        type: QuestionType.LONG_TEXT,
        order: 3,
        required: false,
      },
      {
        sectionId: section3.id,
        text: 'Who has been a role model for you?',
        type: QuestionType.LONG_TEXT,
        order: 4,
        required: false,
      },
      {
        sectionId: section3.id,
        text: 'Do you have a partner?',
        type: QuestionType.YES_NO,
        order: 5,
        required: false,
      },
      {
        sectionId: section3.id,
        text: 'What do you appreciate in your current relationship or friendships?',
        type: QuestionType.LONG_TEXT,
        order: 6,
        required: false,
      },
      {
        sectionId: section3.id,
        text: "In your partner's eyes, what kind of person are you?",
        type: QuestionType.LONG_TEXT,
        order: 7,
        required: false,
      },
      {
        sectionId: section3.id,
        text: "In your friends' eyes, what kind of person are you?",
        type: QuestionType.LONG_TEXT,
        order: 8,
        required: false,
      },
      {
        sectionId: section3.id,
        text: 'Would you like to change anything in your current relationship or friendships?',
        type: QuestionType.LONG_TEXT,
        order: 9,
        required: false,
      },
      {
        sectionId: section3.id,
        text: 'Do you have a life purpose? If yes, what can you tell us about it?',
        type: QuestionType.LONG_TEXT,
        order: 10,
        required: false,
      },
      {
        sectionId: section3.id,
        text: 'If you have a partner, what might be your shared life purpose?',
        type: QuestionType.LONG_TEXT,
        order: 11,
        required: false,
      },
    ],
  });

  console.log('✅ Created page 3: Relationships & Family');

  // Page 4: Self-Rating
  const page4 = await prisma.formPage.create({
    data: {
      formId: form.id,
      title: 'Life Assessment',
      description:
        "Rate different areas of your life to help us understand where you'd like to focus.",
      order: 4,
    },
  });

  const section4 = await prisma.formSection.create({
    data: {
      pageId: page4.id,
      title: 'Self-Rating',
      description:
        'Please rate the following topics on a scale from 0 to 10, where 0 means very poor and 10 means excellent.',
      order: 1,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        sectionId: section4.id,
        text: 'Upbringing',
        type: QuestionType.RATING,
        order: 1,
        required: false,
        validationRules: { min: 0, max: 10 },
      },
      {
        sectionId: section4.id,
        text: 'Handling money/Finance',
        type: QuestionType.RATING,
        order: 2,
        required: false,
        validationRules: { min: 0, max: 10 },
      },
      {
        sectionId: section4.id,
        text: 'Freedom within your relationship',
        type: QuestionType.RATING,
        order: 3,
        required: false,
        validationRules: { min: 0, max: 10 },
      },
      {
        sectionId: section4.id,
        text: 'Intimacy',
        type: QuestionType.RATING,
        order: 4,
        required: false,
        validationRules: { min: 0, max: 10 },
      },
      {
        sectionId: section4.id,
        text: 'Relationship with family',
        type: QuestionType.RATING,
        order: 5,
        required: false,
        validationRules: { min: 0, max: 10 },
      },
      {
        sectionId: section4.id,
        text: 'Balance between private life and work',
        type: QuestionType.RATING,
        order: 6,
        required: false,
        validationRules: { min: 0, max: 10 },
      },
      {
        sectionId: section4.id,
        text: 'Work',
        type: QuestionType.RATING,
        order: 7,
        required: false,
        validationRules: { min: 0, max: 10 },
      },
      {
        sectionId: section4.id,
        text: 'Health',
        type: QuestionType.RATING,
        order: 8,
        required: false,
        validationRules: { min: 0, max: 10 },
      },
    ],
  });

  console.log('✅ Created page 4: Self-Rating');

  // Page 5: Leadership Identity & Expression
  const page5 = await prisma.formPage.create({
    data: {
      formId: form.id,
      title: 'Leadership Identity',
      description: 'Explore your leadership style, strengths, and areas for development.',
      order: 5,
    },
  });

  const section5 = await prisma.formSection.create({
    data: {
      pageId: page5.id,
      title: 'Leadership & Expression',
      description: 'Understanding your leadership journey and aspirations.',
      order: 1,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        sectionId: section5.id,
        text: 'How would you describe your leadership style?',
        type: QuestionType.LONG_TEXT,
        order: 1,
        required: false,
      },
      {
        sectionId: section5.id,
        text: 'What kind of energy do you naturally bring into a group or team?',
        type: QuestionType.LONG_TEXT,
        order: 2,
        required: false,
      },
      {
        sectionId: section5.id,
        text: 'Which aspects of your leadership feel aligned and effortless?',
        type: QuestionType.LONG_TEXT,
        order: 3,
        required: false,
      },
      {
        sectionId: section5.id,
        text: 'Which aspects of your leadership feel forced or draining?',
        type: QuestionType.LONG_TEXT,
        order: 4,
        required: false,
      },
      {
        sectionId: section5.id,
        text: 'When under pressure, what identity patterns (e.g., fixer, controller, pleaser, rebel, achiever) tend to take over?',
        type: QuestionType.LONG_TEXT,
        order: 5,
        required: false,
      },
      {
        sectionId: section5.id,
        text: 'What feedback about your leadership has had the greatest impact on you — positive or negative?',
        type: QuestionType.LONG_TEXT,
        order: 6,
        required: false,
      },
      {
        sectionId: section5.id,
        text: 'What parts of yourself do you tend to hide, suppress, or overemphasize in professional settings?',
        type: QuestionType.LONG_TEXT,
        order: 7,
        required: false,
      },
      {
        sectionId: section5.id,
        text: 'Who are the leaders or mentors that most shaped your leadership identity, and what did you take from them?',
        type: QuestionType.LONG_TEXT,
        order: 8,
        required: false,
      },
      {
        sectionId: section5.id,
        text: 'How do your personal values and your professional role align — or clash?',
        type: QuestionType.LONG_TEXT,
        order: 9,
        required: false,
      },
    ],
  });

  console.log('✅ Created page 5: Leadership Identity & Expression');

  // Page 6: Intention
  const page6 = await prisma.formPage.create({
    data: {
      formId: form.id,
      title: 'Intention & Purpose',
      description: 'Set your intentions for this transformative retreat experience.',
      order: 6,
    },
  });

  const section6 = await prisma.formSection.create({
    data: {
      pageId: page6.id,
      title: 'Your Intentions',
      description: 'What do you hope to explore and integrate during this retreat?',
      order: 1,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        sectionId: section6.id,
        text: 'What does "leading from wholeness" mean to you?',
        type: QuestionType.LONG_TEXT,
        order: 1,
        required: false,
      },
      {
        sectionId: section6.id,
        text: 'What inner contradictions or identity tensions do you feel ready to explore or integrate during this retreat?',
        type: QuestionType.LONG_TEXT,
        order: 2,
        required: false,
      },
      {
        sectionId: section6.id,
        text: 'What impact do you want your leadership to have?',
        type: QuestionType.LONG_TEXT,
        order: 3,
        required: false,
      },
      {
        sectionId: section6.id,
        text: "Name at least two things you'd like to work on during this training: personal and/or professional.",
        type: QuestionType.LONG_TEXT,
        order: 4,
        required: false,
      },
    ],
  });

  console.log('✅ Created page 6: Intention & Purpose');

  // Page 7: Health Questions
  const page7 = await prisma.formPage.create({
    data: {
      formId: form.id,
      title: 'Health & Wellness',
      description: 'Help us ensure your safety and optimize your experience during the retreat.',
      order: 7,
    },
  });

  const section7 = await prisma.formSection.create({
    data: {
      pageId: page7.id,
      title: 'Medical History',
      description:
        'This information is confidential and used only to ensure your safety during bodywork and equine sessions.',
      order: 1,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        sectionId: section7.id,
        text: 'Do you use any medication? If yes, which?',
        type: QuestionType.LONG_TEXT,
        order: 1,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you use homeopathic remedies, vitamins, minerals, etc.? If yes, which?',
        type: QuestionType.LONG_TEXT,
        order: 2,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you have any health complaints?',
        type: QuestionType.LONG_TEXT,
        order: 3,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Are these complaints acute or chronic?',
        type: QuestionType.SINGLE_CHOICE,
        options: ['Acute', 'Chronic', 'Both', 'N/A'],
        order: 4,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Are you currently under any medical treatment? If yes, please explain.',
        type: QuestionType.LONG_TEXT,
        order: 5,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you have mobility problems? If yes, please describe.',
        type: QuestionType.LONG_TEXT,
        order: 6,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Have you ever undergone surgery? If yes, which procedure and when?',
        type: QuestionType.LONG_TEXT,
        order: 7,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Have you ever had an accident? If yes, what kind?',
        type: QuestionType.LONG_TEXT,
        order: 8,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Have you ever had a serious fall?',
        type: QuestionType.YES_NO,
        order: 9,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Are you now—or have you ever been—in treatment at a mental health facility?',
        type: QuestionType.YES_NO,
        order: 10,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you have any blood disorders (e.g. anemia, hemophilia)?',
        type: QuestionType.YES_NO,
        order: 11,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you have high blood pressure?',
        type: QuestionType.YES_NO,
        order: 12,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you have stomach problems? If yes, which?',
        type: QuestionType.LONG_TEXT,
        order: 13,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you have bowel problems?',
        type: QuestionType.YES_NO,
        order: 14,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Is your bowel function regular?',
        type: QuestionType.YES_NO,
        order: 15,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you have diabetes?',
        type: QuestionType.YES_NO,
        order: 16,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you have any heart problems?',
        type: QuestionType.YES_NO,
        order: 17,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you have any respiratory problems?',
        type: QuestionType.YES_NO,
        order: 18,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you suffer from (extreme) fatigue?',
        type: QuestionType.YES_NO,
        order: 19,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Are you allergic to anything? If yes, do you take medication for it? Which?',
        type: QuestionType.LONG_TEXT,
        order: 20,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you fall asleep easily?',
        type: QuestionType.YES_NO,
        order: 21,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you sleep soundly (at least 6 hours uninterrupted)?',
        type: QuestionType.YES_NO,
        order: 22,
        required: false,
      },
      {
        sectionId: section7.id,
        text: 'Do you wake up feeling rested?',
        type: QuestionType.YES_NO,
        order: 23,
        required: false,
      },
      {
        sectionId: section7.id,
        text: "Do you have any additional comments or information you'd like to share?",
        type: QuestionType.LONG_TEXT,
        order: 24,
        required: false,
      },
    ],
  });

  console.log('✅ Created page 7: Health & Wellness');

  // Page 8: Movement Questions
  const page8 = await prisma.formPage.create({
    data: {
      formId: form.id,
      title: 'Movement & Embodiment',
      description:
        'Understanding your relationship with your body helps us tailor the bodywork sessions.',
      order: 8,
    },
  });

  const section8 = await prisma.formSection.create({
    data: {
      pageId: page8.id,
      title: 'Body Awareness',
      description:
        'These questions help us prepare for the Elemental Body Alignment System (EBAS) sessions.',
      order: 1,
    },
  });

  await prisma.question.createMany({
    data: [
      {
        sectionId: section8.id,
        text: 'What is your relationship with movement and your comfortability with it?',
        type: QuestionType.LONG_TEXT,
        order: 1,
        required: false,
      },
      {
        sectionId: section8.id,
        text: 'Do you have any challenges that might impact your participation in spinal and pelvic articulations, getting in and out of a chair/floor, or other joint challenges?',
        type: QuestionType.LONG_TEXT,
        order: 2,
        required: false,
      },
      {
        sectionId: section8.id,
        text: 'How comfortable are you with hands-on learning/cuing?',
        type: QuestionType.SCALE,
        order: 3,
        required: false,
        validationRules: { min: 1, max: 5 },
        description: '1 = Very uncomfortable, 5 = Very comfortable',
      },
      {
        sectionId: section8.id,
        text: 'How valuable do you feel a relationship with your body is to your growth and development as a leader?',
        type: QuestionType.SCALE,
        order: 4,
        required: false,
        validationRules: { min: 1, max: 5 },
        description: '1 = Not valuable, 5 = Extremely valuable',
      },
      {
        sectionId: section8.id,
        text: 'What does being in energetic, emotional and physical alignment mean to you?',
        type: QuestionType.LONG_TEXT,
        order: 5,
        required: false,
      },
      {
        sectionId: section8.id,
        text: 'How important is it for you to be able to claim your space and radiate confidence in your posture?',
        type: QuestionType.SCALE,
        order: 6,
        required: false,
        validationRules: { min: 1, max: 5 },
        description: '1 = Not important, 5 = Extremely important',
      },
      {
        sectionId: section8.id,
        text: 'What does the phrase "comfortable in your skin" mean to you?',
        type: QuestionType.LONG_TEXT,
        order: 7,
        required: false,
      },
      {
        sectionId: section8.id,
        text: 'Space for any extra information you wish to provide beforehand',
        type: QuestionType.LONG_TEXT,
        order: 8,
        required: false,
      },
    ],
  });

  console.log('✅ Created page 8: Movement & Embodiment');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - 1 Form created`);
  console.log(`   - 8 Pages created`);
  console.log(`   - 8 Sections created`);
  console.log(`   - ~72 Questions created`);
  console.log(`   - 1 Admin user created`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
