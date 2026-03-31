require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Blog = require('./models/Blog');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');
const SiteConfig = require('./models/SiteConfig');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}), Blog.deleteMany({}), Project.deleteMany({}),
      Skill.deleteMany({}), Experience.deleteMany({}), SiteConfig.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // --- Admin User ---
    const admin = await User.create({
      name: 'Sajidullah Khan',
      email: 'admin@sajidullahkhan.com',
      password: 'Admin@123456',
      role: 'admin'
    });
    console.log('Admin user created');

    // --- Site Config ---
    const configs = [
      {
        key: 'hero',
        label: 'Hero Section',
        value: {
          headline: 'Full-Stack Developer Exploring the Intersection of Code, Rationality & Meaning',
          subtext: 'I build robust, scalable web systems while engaging deeply with questions of truth, logic, and purpose. Engineering meets philosophy — where every line of code is a deliberate act of reason.',
          cta: 'View My Work',
          ctaLink: '/projects'
        }
      },
      {
        key: 'about',
        label: 'About Section',
        value: {
          title: 'About Me',
          content: `<p>I am Sajidullah Khan — a Full-Stack and Backend Web Developer based in Islamabad, Pakistan, currently pursuing a BS in Computer Science (6th semester, CGPA ~3.5). My technical journey is anchored in the MERN stack, with a strong emphasis on backend architecture, RESTful API design, and scalable system development.</p>
<p>But I am not merely a developer. I am, at my core, a thinker — someone who approaches both code and life with the same demand for coherence, precision, and depth. My intellectual life is shaped by a serious engagement with philosophy, theology (particularly Islamic intellectual tradition), formal logic, and the foundational questions of epistemology: What can we know? How do we justify belief? What is the relationship between reason and revelation?</p>
<p>I believe that the best engineers are not those who merely write code, but those who think clearly. The discipline required to design a well-structured API is not fundamentally different from the discipline required to construct a valid syllogism. Both demand rigor, both demand honesty, and both demand a refusal to accept incoherence.</p>
<p>My approach to problem-solving is systematic and analytical. I seek not just working solutions, but <em>correct</em> solutions — architecturally sound, logically defensible, and maintainable over time. This same temperament drives my philosophical inquiries: I do not settle for surface-level answers but pursue questions to their logical foundations.</p>
<p>In the intersection of technology and thought, I find my purpose: to build systems that serve real human needs, while never losing sight of the deeper questions that give such work its meaning.</p>`,
          languages: ['Pashto', 'English', 'Urdu'],
          interests: ['Philosophy', 'Theology', 'History', 'Logical Reasoning & Debate', 'Problem Solving', 'Cricket', 'Football', 'Gaming']
        }
      },
      {
        key: 'contact',
        label: 'Contact Info',
        value: {
          email: 'sajidullahkhan@example.com',
          location: 'Islamabad, Pakistan',
          availability: 'Open to opportunities'
        }
      },
      {
        key: 'social',
        label: 'Social Links',
        value: {
          github: 'https://github.com/sajidullahkhan',
          linkedin: '',
          twitter: '',
          email: 'sajidullahkhan@example.com'
        }
      }
    ];
    await SiteConfig.insertMany(configs);
    console.log('Site config created');

    // --- Skills ---
    const skills = [
      { name: 'HTML', category: 'Frontend', proficiency: 90, order: 1 },
      { name: 'CSS', category: 'Frontend', proficiency: 85, order: 2 },
      { name: 'JavaScript', category: 'Frontend', proficiency: 88, order: 3 },
      { name: 'React', category: 'Frontend', proficiency: 85, order: 4 },
      { name: 'Node.js', category: 'Backend', proficiency: 88, order: 1 },
      { name: 'Express.js', category: 'Backend', proficiency: 85, order: 2 },
      { name: 'MongoDB', category: 'Database', proficiency: 82, order: 1 },
      { name: 'SQL / MySQL', category: 'Database', proficiency: 70, order: 2 },
      { name: 'Supabase', category: 'Database', proficiency: 60, order: 3 },
      { name: 'C++', category: 'Languages', proficiency: 80, order: 1 },
      { name: 'Java', category: 'Languages', proficiency: 65, order: 2 },
      { name: 'Python', category: 'Languages', proficiency: 70, order: 3 },
      { name: 'JavaScript', category: 'Languages', proficiency: 88, order: 4 },
      { name: 'Git', category: 'Tools', proficiency: 80, order: 1 },
      { name: 'GitHub', category: 'Tools', proficiency: 82, order: 2 }
    ];
    await Skill.insertMany(skills);
    console.log('Skills created');

    // --- Projects ---
    const projects = [
      {
        title: 'Green Hilton Hotel Booking & Management System',
        shortDescription: 'A comprehensive full-stack hotel management platform with role-based access control.',
        description: `<p>The Green Hilton Hotel Booking & Management System is a full-scale web application designed to digitize and streamline every aspect of hotel operations — from guest-facing room bookings to internal administrative workflows.</p>
<p>Built on the MERN stack, the system implements a sophisticated role-based access control mechanism that distinguishes between guests, staff, and administrators, ensuring that each user interacts only with the features relevant to their role.</p>
<p>The guest-facing side provides an intuitive booking interface with real-time availability checking, date-based filtering, and secure reservation management. Guests can browse available rooms, view detailed amenities, and complete bookings with instant confirmation.</p>
<p>On the administrative side, hotel managers have access to a comprehensive dashboard that provides occupancy analytics, revenue tracking, and booking management tools. The system supports CRUD operations for rooms, halls, flats, menu items, and gallery content — making it a complete content management solution for hospitality businesses.</p>
<p>This project taught me the complexities of building real-world systems where reliability and user trust are paramount. Every architectural decision — from database schema design to API endpoint structure — was made with production deployment in mind.</p>`,
        techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary'],
        category: 'Full Stack',
        featured: true,
        order: 1,
        features: [
          'Role-based access control (Guest, Staff, Admin)',
          'Real-time room availability and booking system',
          'Admin dashboard with analytics and occupancy tracking',
          'Complete CRUD for rooms, halls, flats, menu, and gallery',
          'Secure JWT-based authentication',
          'Responsive design for all devices',
          'Cloudinary integration for media management'
        ],
        learnings: [
          'Designing complex role-based authorization systems',
          'Building production-grade REST APIs with proper error handling',
          'Managing real-time state across multiple user roles',
          'Database schema design for hospitality domain'
        ]
      },
      {
        title: 'Task Management System',
        shortDescription: 'A full-stack MERN task manager with authentication and priority-based organization.',
        description: `<p>The Task Management System is a MERN stack application designed to bring structure and clarity to personal and team productivity. It goes beyond simple to-do lists by implementing a complete authentication system, task categorization, priority levels, and status tracking.</p>
<p>The application features a clean, intuitive interface where users can create, update, and organize tasks with attributes including priority (low, medium, high, critical), status (pending, in-progress, completed), due dates, and descriptive notes.</p>
<p>Authentication is implemented using JWT tokens with secure password hashing, ensuring that each user's task data is private and protected. The backend follows a clean MVC architecture with separated concerns for routes, controllers, and database models.</p>
<p>Building this project reinforced my understanding of full-stack architecture patterns and the importance of clean API design. It served as an excellent exercise in state management on the frontend and data validation on the backend.</p>`,
        techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'CSS3'],
        category: 'Full Stack',
        featured: true,
        order: 2,
        features: [
          'JWT-based user authentication and authorization',
          'Full CRUD operations for tasks',
          'Priority levels and status tracking',
          'Due date management with visual indicators',
          'Clean MVC backend architecture',
          'Responsive task dashboard'
        ],
        learnings: [
          'Implementing secure authentication flows',
          'State management patterns in React',
          'RESTful API best practices',
          'Frontend-backend integration patterns'
        ]
      },
      {
        title: 'Sortify — Intelligent File Organization System',
        shortDescription: 'An algorithm-driven file organizer that goes beyond extension-based sorting using semantic classification.',
        description: `<p>Sortify is not your typical file sorter. Born out of a Design and Analysis of Algorithms course project, Sortify approaches file organization as an algorithmic challenge — using intelligent classification strategies that go far beyond naive extension-based sorting.</p>
<p>The system analyzes files not just by their extensions, but by their semantic context, naming patterns, and content relationships. It implements multiple sorting and classification algorithms, comparing their efficiency and accuracy in organizing large, heterogeneous file collections.</p>
<p>The project explores fundamental questions in algorithm design: How do we define "organization"? What makes one classification scheme superior to another? How do we balance computational efficiency with classification accuracy?</p>
<p>This project represents my interest in the theoretical foundations of computer science — the recognition that behind every practical tool lies a set of algorithmic principles that can be studied, optimized, and formally analyzed.</p>`,
        techStack: ['Python', 'Algorithms', 'File System APIs', 'Data Structures'],
        category: 'Algorithm & Systems',
        featured: false,
        order: 3,
        features: [
          'Semantic file classification beyond extension matching',
          'Multiple sorting algorithm implementations',
          'Performance comparison and benchmarking',
          'Batch processing for large file collections',
          'Configurable organization rules'
        ],
        learnings: [
          'Practical application of algorithm design principles',
          'Performance analysis and optimization',
          'Working with file system APIs',
          'Understanding classification as a computational problem'
        ]
      },
      {
        title: 'Classic Snake Game',
        shortDescription: 'A retro-style Snake game built with C++ and Raylib featuring smooth controls and progressive difficulty.',
        description: `<p>This Classic Snake Game is a faithful yet polished recreation of the iconic arcade game, built entirely in C++ using the Raylib graphics library. The project demonstrates that strong fundamentals in a systems-level language like C++ remain relevant and powerful.</p>
<p>The game features smooth, responsive controls, progressive difficulty scaling, a scoring system with high-score persistence, and clean pixel-art aesthetics. Under the hood, it implements efficient data structures for the snake body management and collision detection algorithms.</p>
<p>Beyond the game itself, this project was an exercise in understanding game loops, frame-rate management, input handling, and the rendering pipeline — concepts that are foundational to understanding how software interacts with hardware at a fundamental level.</p>`,
        techStack: ['C++', 'Raylib', 'OOP', 'Game Development'],
        category: 'Game Development',
        featured: false,
        order: 4,
        features: [
          'Smooth and responsive snake controls',
          'Progressive difficulty scaling',
          'Score tracking with high-score persistence',
          'Clean retro pixel-art visual design',
          'Efficient collision detection',
          'Frame-rate independent game loop'
        ],
        learnings: [
          'Game loop architecture and frame management',
          'C++ memory management and data structures',
          'Graphics rendering with Raylib',
          'Input handling and real-time systems'
        ]
      },
      {
        title: 'Portfolio Website (Previous Version)',
        shortDescription: 'An earlier MERN-based portfolio that laid the groundwork for this current advanced platform.',
        description: `<p>This was my first attempt at building a personal portfolio — a MERN stack application that served as both a showcase of my work and a learning exercise in full-stack development.</p>
<p>While simpler in scope than the current platform, it established the foundational patterns I would later refine: component-based React architecture, Express API design, MongoDB data modeling, and responsive CSS layouts.</p>
<p>The project represented an important milestone in my development journey — the moment when I transitioned from building tutorial projects to creating something genuinely personal and self-directed. It taught me that the most valuable projects are those where you are both the developer and the stakeholder.</p>`,
        techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'CSS3'],
        category: 'Full Stack',
        featured: false,
        order: 5,
        features: [
          'Component-based React architecture',
          'RESTful API with Express',
          'MongoDB data persistence',
          'Responsive design',
          'Project showcase section'
        ],
        learnings: [
          'End-to-end full-stack application development',
          'Self-directed project planning and execution',
          'Deployment and production considerations',
          'Iterative design improvement'
        ]
      }
    ];
    await Project.insertMany(projects);
    console.log('Projects created');

    // --- Experience ---
    const experiences = [
      {
        type: 'work',
        title: 'Backend Developer Intern',
        organization: 'DevelopersHub Corporation',
        location: 'Remote',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        current: false,
        description: 'Focused on backend development, building scalable server-side systems for real-world e-commerce applications.',
        highlights: [
          'Designed and implemented the complete backend architecture for an e-commerce platform',
          'Developed RESTful APIs for a bookstore management system with full CRUD operations',
          'Implemented JWT-based authentication and role-based authorization',
          'Worked with MongoDB for database design and query optimization',
          'Followed industry best practices for API security, input validation, and error handling'
        ],
        order: 1
      },
      {
        type: 'work',
        title: 'Full Stack Developer Intern',
        organization: 'DevelopersHub Corporation',
        location: 'Remote',
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-12-31'),
        current: false,
        description: 'Expanded into full-stack development, contributing to multiple production-grade web applications across diverse domains.',
        highlights: [
          'Built a comprehensive Task Management System using the MERN stack from scratch',
          'Contributed to an Alibaba-style e-commerce platform with complex product management and order flows',
          'Worked on the Nexus platform — a system connecting entrepreneurs with investors, featuring pitch submissions, investor dashboards, and matching algorithms',
          'Gained experience in collaborative development workflows using Git and GitHub',
          'Developed proficiency in React component architecture and state management patterns'
        ],
        order: 2
      },
      {
        type: 'education',
        title: 'BS Computer Science',
        organization: 'University (Islamabad, Pakistan)',
        location: 'Islamabad, Pakistan',
        startDate: new Date('2023-01-01'),
        endDate: null,
        current: true,
        description: 'Currently in the 6th semester with a CGPA of approximately 3.5. Coursework includes Data Structures & Algorithms, Database Systems, Software Engineering, Operating Systems, and Object-Oriented Programming.',
        highlights: [
          'Maintaining a CGPA of ~3.5 with strong performance in core CS courses',
          'Completed coursework in DSA, DBMS, Software Engineering, OOP, and OS',
          'Applied theoretical knowledge to practical full-stack projects',
          'Engaged in independent study of philosophy, logic, and intellectual history'
        ],
        order: 3
      }
    ];
    await Experience.insertMany(experiences);
    console.log('Experience created');

    // --- Blog Posts ---
    const blogs = [
      {
        title: 'The Architecture of Rational Inquiry: Why Clear Thinking is the Foundation of Everything',
        content: `<h2>The Problem of Unexamined Assumptions</h2>
<p>We live in an age of unprecedented information access, yet rational thinking has never been more neglected. The modern mind is trained to consume, not to analyze — to absorb opinions, not to examine premises. This is not merely an intellectual failure; it is an existential one. For how we think determines what we believe, and what we believe determines how we live.</p>
<p>Rational inquiry begins not with answers, but with the recognition that most of our beliefs rest on foundations we have never examined. The first act of genuine thinking is to ask: <em>Why do I believe what I believe?</em></p>

<h2>The Structure of Sound Reasoning</h2>
<p>At its core, rational inquiry follows a disciplined structure. Every claim must be supported by evidence or argument. Every argument must follow valid logical form. And every piece of evidence must be evaluated for reliability and relevance.</p>
<p>This is not merely academic pedantry — it is the essential discipline that separates knowledge from opinion, understanding from prejudice. When Aristotle codified the syllogism, he was not creating an abstract game; he was describing the fundamental architecture of how the human mind arrives at truth.</p>
<pre><code>Premise 1: All sound conclusions require valid premises.
Premise 2: Unexamined beliefs provide no guarantee of valid premises.
Conclusion: Therefore, unexamined beliefs cannot guarantee sound conclusions.</code></pre>

<h2>Rationality as a Way of Life</h2>
<p>To be rational is not to be cold or mechanical. It is to be honest — honest with evidence, honest with logic, and most importantly, honest with oneself. The rational thinker does not fear being wrong; they fear remaining wrong.</p>
<p>This commitment to intellectual honesty extends beyond formal argumentation. It shapes how we read, how we converse, how we make decisions, and how we approach the fundamental questions of existence. Rationality is not a tool we use occasionally; it is a lens through which we engage with reality itself.</p>

<h2>The Intersection with Technology</h2>
<p>As a software developer, I find that the principles of rational inquiry are remarkably congruent with the principles of good engineering. Both demand precision. Both penalize incoherence. Both require the courage to refactor your thinking when you discover that your current model is flawed.</p>
<p>Writing clean code is, in a very real sense, an exercise in applied logic. Every function is an argument. Every test is an empirical check. Every refactor is a revision of one's understanding. The developer who thinks clearly writes clearly — and the code they produce reflects the quality of their reasoning.</p>

<h2>Conclusion</h2>
<p>Rational inquiry is not a luxury of the intellectual elite. It is the birthright of every thinking being. To reason well is to live well — to navigate the world not by impulse or convention, but by the light of carefully examined evidence and logically sound argument.</p>
<p>The question is not whether we <em>can</em> think clearly. The question is whether we have the discipline and the courage to do so.</p>`,
        excerpt: 'Exploring why rational thinking is the foundation of both intellectual life and software engineering — and why the unexamined mind is the greatest vulnerability.',
        category: 'Philosophy',
        tags: ['rationality', 'logic', 'philosophy', 'critical-thinking'],
        status: 'published',
        seoTitle: 'The Architecture of Rational Inquiry | Sajidullah Khan',
        seoDescription: 'An exploration of why clear thinking is foundational to both intellectual inquiry and software engineering.',
        seoKeywords: ['rational thinking', 'logic', 'philosophy', 'critical thinking'],
        author: admin._id
      },
      {
        title: 'Reason and Revelation: Can Faith and Logic Coexist?',
        content: `<h2>The False Dichotomy</h2>
<p>One of the most persistent intellectual assumptions of the modern age is that reason and religious belief are fundamentally incompatible — that to embrace one is to abandon the other. This assumption is not only historically inaccurate; it is philosophically naive.</p>
<p>The great intellectual traditions of Islam, Christianity, and Judaism have produced some of the most rigorous logical thinkers in human history. Al-Kindi, Ibn Sina (Avicenna), Ibn Rushd (Averroes), Al-Ghazali, Thomas Aquinas, Maimonides — these were not thinkers who checked their reason at the door of faith. They were thinkers who believed that reason, properly employed, <em>leads</em> to truth — including truths about the divine.</p>

<h2>The Islamic Intellectual Tradition</h2>
<p>In the Islamic tradition, the Quran itself repeatedly calls upon its readers to think, to reflect, to use their intellect (<em>aql</em>). The Arabic term <em>tafakkur</em> — deep contemplation — is not an optional spiritual exercise; it is presented as a fundamental human obligation.</p>
<p>The golden age of Islamic civilization produced remarkable advances in mathematics, astronomy, medicine, and philosophy precisely because the culture valued intellectual inquiry as a religious duty. The pursuit of knowledge (<em>ilm</em>) was understood not as a secular activity separate from faith, but as an essential expression of it.</p>

<h2>The Nature of the Argument</h2>
<p>The question is not whether faith and reason can coexist — history has decisively answered that in the affirmative. The deeper question is: <em>What is the proper relationship between them?</em></p>
<p>Three positions have emerged across intellectual history:</p>
<ol>
<li><strong>Reason subordinate to faith</strong>: Reason is a useful tool, but revelation has final authority where they appear to conflict.</li>
<li><strong>Faith subordinate to reason</strong>: Religious claims must be evaluated by rational standards, and those that fail are to be reinterpreted or rejected.</li>
<li><strong>Complementary domains</strong>: Reason and faith address different dimensions of human experience, and each is authoritative in its proper domain.</li>
</ol>
<p>Each position has sophisticated defenders and genuine philosophical merit. What is intellectually dishonest is to dismiss any of them without engagement.</p>

<h2>The Rational Case for Theism</h2>
<p>It is worth noting that many of the strongest arguments in the history of philosophy are arguments <em>for</em> the existence of God — the cosmological argument, the teleological argument, the argument from contingency, the moral argument. These are not appeals to emotion or authority; they are rigorous logical constructions that have been debated by the finest minds for centuries.</p>
<p>To dismiss theism as inherently irrational is itself an irrational act — one that betrays either ignorance of these arguments or an unwillingness to engage with them.</p>

<h2>Conclusion</h2>
<p>The honest thinker does not begin with the assumption that faith is irrational, nor with the assumption that reason is sufficient for all questions. The honest thinker begins with a commitment to follow the argument wherever it leads — even if it leads to conclusions that challenge their comfortable assumptions.</p>
<p>Reason and faith are not enemies. At their best, they are partners in the human quest to understand reality in its fullness.</p>`,
        excerpt: 'Examining the relationship between reason and religious belief through the lens of Islamic intellectual history and classical philosophy.',
        category: 'Theology',
        tags: ['faith', 'reason', 'islamic-philosophy', 'theology', 'logic'],
        status: 'published',
        seoTitle: 'Reason and Revelation: Can Faith and Logic Coexist? | Sajidullah Khan',
        seoDescription: 'A philosophical examination of whether faith and reason are compatible, drawing from Islamic intellectual tradition.',
        seoKeywords: ['faith and reason', 'Islamic philosophy', 'theology', 'rational theism'],
        author: admin._id
      },
      {
        title: 'The Limits of Empiricism: What Science Cannot Tell Us',
        content: `<h2>The Authority of Science</h2>
<p>Science is, without question, the most powerful method humanity has developed for understanding the physical world. Its achievements are extraordinary: from the structure of DNA to the age of the universe, from antibiotics to artificial intelligence. No honest thinker can deny the remarkable success of the scientific method.</p>
<p>But to acknowledge the power of science is not the same as claiming that science can answer <em>every</em> meaningful question. The assumption that it can — often called <em>scientism</em> — is not itself a scientific claim. It is a philosophical one. And it is, I will argue, a deeply problematic one.</p>

<h2>Questions Beyond the Empirical</h2>
<p>Consider the following questions:</p>
<ul>
<li>What makes an action morally right or wrong?</li>
<li>Why is there something rather than nothing?</li>
<li>What is consciousness, and why does subjective experience exist?</li>
<li>Do mathematical truths exist independently of human minds?</li>
<li>What constitutes a meaningful life?</li>
</ul>
<p>These are not trivial questions. They are among the most important questions a human being can ask. And none of them can be answered by empirical observation alone. They require philosophical reasoning — the very discipline that science itself was born from.</p>

<h2>The Self-Refuting Nature of Scientism</h2>
<p>The claim "only scientific knowledge is real knowledge" is itself not a scientific claim — it cannot be verified by experiment, observation, or measurement. It is a philosophical assertion. Therefore, by its own standard, it fails to qualify as real knowledge.</p>
<p>This is not a minor logical quibble. It reveals a fundamental incoherence at the heart of scientism: it relies on philosophical reasoning to deny the validity of philosophical reasoning.</p>

<h2>Science and Philosophy as Partners</h2>
<p>The solution is not to diminish science, but to recognize its proper scope. Science tells us <em>how</em> the physical world works. Philosophy asks <em>why</em> — and whether the categories science uses (causation, laws, probability) are themselves adequate to capture the full depth of reality.</p>
<p>The greatest scientists have always understood this. Einstein spoke of the "mysterious" as the source of all true art and science. Heisenberg reflected deeply on the philosophical implications of quantum mechanics. Gödel's incompleteness theorems demonstrated, with mathematical rigor, that formal systems have inherent limitations.</p>

<h2>Implications for the Thinking Developer</h2>
<p>As software engineers, we work within formal systems every day. We understand that every system has constraints, every model has limitations, and every abstraction leaks. The same humility should apply to our understanding of knowledge itself.</p>
<p>To be a truly complete thinker — and therefore a truly complete developer — we must be willing to engage with questions that cannot be reduced to code, data, or algorithms. The most important bugs in human thinking are not runtime errors; they are category errors — the failure to recognize that different kinds of questions require different kinds of inquiry.</p>

<h2>Conclusion</h2>
<p>Science is indispensable. But it is not omnipotent. To recognize its limits is not to undermine it — it is to understand it properly, and to ensure that the full range of human inquiry remains open.</p>`,
        excerpt: 'Why the scientific method, for all its power, cannot answer every meaningful question — and why philosophy remains indispensable.',
        category: 'Philosophy',
        tags: ['philosophy', 'science', 'epistemology', 'scientism', 'knowledge'],
        status: 'published',
        seoTitle: 'The Limits of Empiricism: What Science Cannot Tell Us | Sajidullah Khan',
        seoDescription: 'Exploring the boundaries of scientific knowledge and the enduring necessity of philosophical inquiry.',
        seoKeywords: ['limits of science', 'philosophy of science', 'epistemology', 'scientism'],
        author: admin._id
      },
      {
        title: 'On Meaning and Purpose: The Question That Refuses to Be Silenced',
        content: `<h2>The Unavoidable Question</h2>
<p>Every human being, at some point in their life, confronts the question of meaning. Not in the abstract, academic sense — but in the visceral, existential sense that strikes at 3 AM, or in the quiet moment after a significant accomplishment when you ask: <em>Is this all there is?</em></p>
<p>This question cannot be escaped. It can be suppressed, distracted from, or cynically dismissed — but it always returns. And the quality of our lives depends, in large measure, on how honestly we engage with it.</p>

<h2>The Modern Crisis of Meaning</h2>
<p>Modern secular culture has, by and large, abandoned the frameworks that traditionally provided answers to the question of meaning — religion, philosophy, metaphysics. In their place, it offers consumption, productivity, and entertainment. These are not bad things in themselves. But they are profoundly inadequate as foundations for a meaningful life.</p>
<p>The result is what Viktor Frankl called the "existential vacuum" — a pervasive sense of emptiness and purposelessness that manifests as anxiety, depression, and a frantic pursuit of distraction. We have more comfort than any generation in history, yet less clarity about why we are alive.</p>

<h2>The Philosophical Landscape</h2>
<p>Philosophy offers several frameworks for thinking about meaning:</p>
<p><strong>Nihilism</strong> claims that life has no inherent meaning. While this position has a certain logical purity, it is practically unlivable — no one truly acts as if nothing matters.</p>
<p><strong>Existentialism</strong> argues that meaning is not found but <em>created</em> through authentic choice. This has appeal, but raises the question: on what basis do we choose one meaning over another?</p>
<p><strong>Theistic frameworks</strong> hold that meaning is grounded in a transcendent reality — that human life has purpose because it participates in a larger cosmic story. This position has the advantage of providing an objective foundation for meaning, but requires engagement with questions of revelation and faith.</p>

<h2>Meaning and Work</h2>
<p>For those of us who build things — whether code, systems, or organizations — the question of meaning is especially pressing. We spend enormous amounts of time and energy creating things. But <em>for what?</em></p>
<p>The answer, I believe, lies not in the product but in the process — not in what we build, but in <em>how</em> and <em>why</em> we build it. Work becomes meaningful when it is done with excellence, integrity, and a sense of service to something beyond ourselves.</p>

<h2>Conclusion</h2>
<p>The question of meaning is not a weakness to be overcome but a signal to be heeded. It points us toward the deepest dimensions of human existence — dimensions that no amount of technical progress can render obsolete.</p>
<p>To live a meaningful life requires the same disciplines we apply to good engineering: rigorous thinking, honest self-assessment, and the courage to build on foundations that are genuinely sound.</p>`,
        excerpt: 'Why the question of meaning cannot be escaped, and how different philosophical frameworks attempt to answer it.',
        category: 'Philosophy',
        tags: ['meaning', 'purpose', 'existentialism', 'philosophy', 'theology'],
        status: 'published',
        seoTitle: 'On Meaning and Purpose: The Question That Refuses to Be Silenced | Sajidullah Khan',
        seoDescription: 'A reflection on the question of meaning, exploring nihilism, existentialism, and theistic answers.',
        seoKeywords: ['meaning of life', 'purpose', 'existentialism', 'philosophy'],
        author: admin._id
      },
      {
        title: 'Inference, Evidence, and the Ethics of Belief: A Developer\'s Epistemology',
        content: `<h2>What Does It Mean to "Know" Something?</h2>
<p>Epistemology — the study of knowledge — is rarely discussed in developer circles. Yet every time we debug code, evaluate a technical claim, or choose an architecture, we are engaging in epistemic activity. We are making judgments about what is true, what evidence supports it, and how confident we should be.</p>
<p>The principles that guide good epistemic practice are remarkably similar to the principles that guide good engineering: demand evidence, follow logical inference, and be willing to revise your beliefs when the evidence changes.</p>

<h2>The Ethics of Belief</h2>
<p>The philosopher W.K. Clifford argued that "it is wrong always, everywhere, and for anyone, to believe anything upon insufficient evidence." This is a strong claim — perhaps too strong — but its core insight is valuable: we have a <em>responsibility</em> to believe wisely.</p>
<p>Irresponsible belief is not merely an intellectual failure; it has practical consequences. The developer who believes their code is bug-free without testing it, the architect who assumes a system will scale without benchmarking it, the manager who trusts a vendor's claims without due diligence — all are engaging in epistemic negligence.</p>

<h2>Types of Inference</h2>
<p>Understanding the different types of inference helps us reason more clearly:</p>
<p><strong>Deductive inference</strong>: If the premises are true, the conclusion must be true. This is the gold standard of reasoning, but it requires premises we can be certain of — which is rare in practice.</p>
<pre><code>If all valid arguments have true premises and valid form, then their conclusions are true.
This argument has true premises and valid form.
Therefore, its conclusion is true.</code></pre>
<p><strong>Inductive inference</strong>: Drawing general conclusions from specific observations. This is powerful but never certain — as David Hume famously demonstrated.</p>
<p><strong>Abductive inference</strong> (inference to the best explanation): Choosing the hypothesis that best explains the available evidence. This is how we debug code, diagnose illnesses, and do most of our everyday reasoning.</p>

<h2>Applying Epistemology to Development</h2>
<p>Every time we write a unit test, we are practicing empiricism. Every time we design a type system, we are practicing formal logic. Every time we debug by forming hypotheses and testing them, we are practicing the scientific method.</p>
<p>The best developers, I believe, are those who are conscious of these epistemic practices — who understand not just <em>what</em> they are doing, but <em>why</em> it works. This metacognitive awareness makes us more rigorous, more adaptable, and ultimately more effective.</p>

<h2>Conclusion</h2>
<p>Knowledge is not passive reception of information. It is active, disciplined engagement with evidence and argument. Whether we are evaluating a philosophical claim, debugging a system, or deciding what to believe about the nature of reality, the same principles apply: demand evidence, reason carefully, and hold your conclusions with appropriate confidence.</p>
<p>The ethics of belief is not an abstract philosophical concept. It is a practical discipline that shapes the quality of our code, our thinking, and our lives.</p>`,
        excerpt: 'Exploring the surprising connections between epistemology (the philosophy of knowledge) and software development practices.',
        category: 'Philosophy',
        tags: ['epistemology', 'logic', 'inference', 'knowledge', 'development'],
        status: 'published',
        seoTitle: 'Inference, Evidence, and the Ethics of Belief | Sajidullah Khan',
        seoDescription: 'How epistemology connects to software development — exploring inference, evidence, and responsible belief.',
        seoKeywords: ['epistemology', 'logic', 'evidence', 'belief', 'software development'],
        author: admin._id
      }
    ];
    for (const blogData of blogs) {
      const blog = new Blog(blogData);
      await blog.save();
    }
    console.log('Blog posts created');

    console.log('\n=== Seed completed successfully ===');
    console.log('Admin login: admin@sajidullahkhan.com / Admin@123456');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
