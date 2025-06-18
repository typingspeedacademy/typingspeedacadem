// src/data/sampleTexts.ts

export interface SampleText {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: 'en' | 'es' | 'ar'; // Added 'ar' for Arabic
  source?: string;
}

export const sampleTexts: SampleText[] = [
  {
    id: 'easy-1',
    text: 'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. This is a simple sentence for typing practice.',
    difficulty: 'easy',
    language: 'en',
    source: 'Pangram',
  },
  {
    id: 'medium-1',
    text: 'Programming is the process of creating a set of instructions that tell a computer how to perform a task. It involves tasks such as analysis, generating algorithms, profiling algorithms\' accuracy and resource consumption, and the implementation of algorithms in a chosen programming language.',
    difficulty: 'medium',
    language: 'en',
    source: 'Wikipedia',
  },
  {
    id: 'hard-1',
    text: 'The International Obfuscated C Code Contest (abbreviated IOCCC) is a computer programming contest for the most creatively obfuscated C code. Held annually, it is described as "celebrating C\'s syntactical opaqueness". Previous winning entries have included a program that emulated the Enigma machine and a C compiler written in C.',
    difficulty: 'hard',
    language: 'en',
    source: 'IOCCC',
  },
  {
    id: 'easy-2',
    text: 'Hello world. This is another easy text. Keep practicing to improve your speed and accuracy. Typing fast is a useful skill.',
    difficulty: 'easy',
    language: 'en',
  },
  {
    id: 'medium-2',
    text: 'Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by humans or animals. Leading AI textbooks define the field as the study of \'intelligent agents\': any system that perceives its environment and takes actions that maximize its chance of achieving its goals.',
    difficulty: 'medium',
    language: 'en',
  },
  {
    id: 'hard-2',
    text: 'Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in such a way that the quantum state of each particle of the group cannot be described independently of the state of the others, including when the particles are separated by a large distance.',
    difficulty: 'hard',
    language: 'en',
  },
  // Adding some Spanish texts for demonstration
  {
    id: 'es-easy-1',
    text: 'El rápido zorro marrón salta sobre el perro perezoso. Empaca mi caja con cinco docenas de jarras de licor. Esta es una oración simple para practicar la escritura.',
    difficulty: 'easy',
    language: 'es',
    source: 'Pangram (ES)',
  },
  {
    id: 'es-medium-1',
    text: 'La programación es el proceso de crear un conjunto de instrucciones que le dicen a una computadora cómo realizar una tarea. Implica tareas como el análisis, la generación de algoritmos, la elaboración de perfiles de precisión y consumo de recursos de los algoritmos, y la implementación de algoritmos en un lenguaje de programación elegido.',
    difficulty: 'medium',
    language: 'es',
    source: 'Wikipedia (ES)',
  },
  {
    id: 'es-hard-1',
    text: 'El Concurso Internacional de Código C Ofuscado (abreviado IOCCC) es un concurso de programación informática para el código C más creativamente ofuscado. Celebrado anualmente, se describe como "la celebración de la opacidad sintáctica de C". Las participaciones ganadoras anteriores han incluido un programa que emulaba la máquina Enigma y un compilador de C escrito en C.',
    difficulty: 'hard',
    language: 'es',
    source: 'IOCCC (ES)',
  },
  // Adding Arabic texts
  {
    id: 'ar-easy-1',
    text: 'الثعلب البني السريع يقفز فوق الكلب الكسول. قم بتعبئة صندوقي بخمسة دزينات من أباريق الخمر. هذه جملة بسيطة لممارسة الكتابة.',
    difficulty: 'easy',
    language: 'ar',
    source: 'Pangram (AR)',
  },
  {
    id: 'ar-medium-1',
    text: 'البرمجة هي عملية إنشاء مجموعة من التعليمات التي تخبر الكمبيوتر بكيفية أداء مهمة ما. وهي تتضمن مهام مثل التحليل وتوليد الخوارزميات وتحديد دقة الخوارزميات واستهلاكها للموارد وتنفيذ الخوارزميات بلغة برمجة مختارة.',
    difficulty: 'medium',
    language: 'ar',
    source: 'Wikipedia (AR)',
  },
  {
    id: 'ar-hard-1',
    text: 'مسابقة كود سي الدولي المبهم (IOCCC) هي مسابقة برمجة حاسوب لأكثر أكواد سي إبهامًا بشكل إبداعي. تقام سنويًا، وتوصف بأنها "تحتفي بالغموض النحوي للغة سي". تضمنت الإدخالات الفائزة السابقة برنامجًا يحاكي آلة إنجما ومترجم سي مكتوب بلغة سي.',
    difficulty: 'hard',
    language: 'ar',
    source: 'IOCCC (AR)',
  },
  // Adding more English texts
  {
    id: 'en-easy-3',
    text: 'Practice makes perfect. Type these words as fast as you can. The sun is shining today. Birds are singing in the trees.',
    difficulty: 'easy',
    language: 'en',
  },
  {
    id: 'en-easy-4',
    text: 'My cat is very fluffy. I like to play video games. Reading books is a good habit. What is your favorite color?',
    difficulty: 'easy',
    language: 'en',
  },
  {
    id: 'en-medium-3',
    text: 'The history of the internet is a fascinating subject, involving many pioneers and technological breakthroughs. Understanding its evolution helps us appreciate its current impact on society and communication worldwide.',
    difficulty: 'medium',
    language: 'en',
  },
  {
    id: 'en-medium-4',
    text: 'Climate change is a significant global challenge that requires collective action from individuals, governments, and industries. Renewable energy sources and sustainable practices are crucial for mitigating its effects.',
    difficulty: 'medium',
    language: 'en',
  },
  {
    id: 'en-hard-3',
    text: 'Cryptography, the practice and study of techniques for secure communication in the presence of third parties called adversaries, underpins much of modern digital security, from e-commerce transactions to encrypted messaging applications.',
    difficulty: 'hard',
    language: 'en',
  },
  {
    id: 'en-hard-4',
    text: 'The philosophical implications of artificial general intelligence (AGI) are profound, raising questions about consciousness, ethics, and the future of humanity. Researchers are actively debating the potential risks and benefits of AGI development.',
    difficulty: 'hard',
    language: 'en',
  },
  // Adding more Spanish texts
  {
    id: 'es-easy-3',
    text: 'La práctica hace al maestro. Escribe estas palabras lo más rápido que puedas. El sol brilla hoy. Los pájaros cantan en los árboles.',
    difficulty: 'easy',
    language: 'es',
  },
  {
    id: 'es-easy-4',
    text: 'Mi gato es muy esponjoso. Me gusta jugar videojuegos. Leer libros es un buen hábito. ¿Cuál es tu color favorito?',
    difficulty: 'easy',
    language: 'es',
  },
  {
    id: 'es-medium-3',
    text: 'La historia de internet es un tema fascinante, que involucra a muchos pioneros y avances tecnológicos. Comprender su evolución nos ayuda a apreciar su impacto actual en la sociedad y la comunicación en todo el mundo.',
    difficulty: 'medium',
    language: 'es',
  },
  {
    id: 'es-medium-4',
    text: 'El cambio climático es un desafío global significativo que requiere una acción colectiva de individuos, gobiernos e industrias. Las fuentes de energía renovable y las prácticas sostenibles son cruciales para mitigar sus efectos.',
    difficulty: 'medium',
    language: 'es',
  },
  {
    id: 'es-hard-3',
    text: 'La criptografía, la práctica y el estudio de técnicas para la comunicación segura en presencia de terceros llamados adversarios, sustenta gran parte de la seguridad digital moderna, desde las transacciones de comercio electrónico hasta las aplicaciones de mensajería cifrada.',
    difficulty: 'hard',
    language: 'es',
  },
  {
    id: 'es-hard-4',
    text: 'Las implicaciones filosóficas de la inteligencia artificial general (IAG) son profundas y plantean interrogantes sobre la conciencia, la ética y el futuro de la humanidad. Los investigadores debaten activamente los riesgos y beneficios potenciales del desarrollo de la IAG.',
    difficulty: 'hard',
    language: 'es',
  },
  // Adding more Arabic texts
  {
    id: 'ar-easy-3',
    text: 'التدريب يؤدي إلى الإتقان. اكتب هذه الكلمات بأسرع ما يمكنك. الشمس مشرقة اليوم. الطيور تغني في الأشجار.',
    difficulty: 'easy',
    language: 'ar',
  },
  {
    id: 'ar-easy-4',
    text: 'قطتي رقيقة جدا. أحب أن ألعب ألعاب الفيديو. قراءة الكتب عادة جيدة. ما هو لونك المفضل؟',
    difficulty: 'easy',
    language: 'ar',
  },
  {
    id: 'ar-medium-3',
    text: 'تاريخ الإنترنت موضوع رائع، يشمل العديد من الرواد والاختراقات التكنولوجية. فهم تطوره يساعدنا على تقدير تأثيره الحالي على المجتمع والتواصل في جميع أنحاء العالم.',
    difficulty: 'medium',
    language: 'ar',
  },
  {
    id: 'ar-medium-4',
    text: 'تغير المناخ تحد عالمي كبير يتطلب عملاً جماعياً من الأفراد والحكومات والصناعات. مصادر الطاقة المتجددة والممارسات المستدامة حاسمة للتخفيف من آثاره.',
    difficulty: 'medium',
    language: 'ar',
  },
  {
    id: 'ar-hard-3',
    text: 'التشفير، وهو ممارسة ودراسة تقنيات الاتصال الآمن في وجود أطراف ثالثة تسمى الخصوم، يدعم الكثير من الأمن الرقمي الحديث، من معاملات التجارة الإلكترونية إلى تطبيقات المراسلة المشفرة.',
    difficulty: 'hard',
    language: 'ar',
  },
  {
    id: 'ar-hard-4',
    text: 'الآثار الفلسفية للذكاء الاصطناعي العام (AGI) عميقة، وتثير تساؤلات حول الوعي والأخلاق ومستقبل البشرية. يناقش الباحثون بنشاط المخاطر والفوائد المحتملة لتطوير الذكاء الاصطناعي العام.',
    difficulty: 'hard',
    language: 'ar',
  }
];