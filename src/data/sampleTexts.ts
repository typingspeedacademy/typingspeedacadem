// src/data/sampleTexts.ts

export interface SampleText {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: 'en' | 'es'; // Added language property (e.g., English, Spanish)
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
  }
];