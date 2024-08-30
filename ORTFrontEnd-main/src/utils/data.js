export const testLevels = [
  {
    level: "Auditory Visual Match",
    type: "audio",
    questions: [
      {
        audioPath: "audio/dogAudio.mp3",
        options: [
          { option: "https://png.pngtree.com/png-clipart/20231021/original/pngtree-cute-cartoon-dog-png-file-png-image_13395067.png", isCorrect: true },
          { option: "https://img.freepik.com/free-vector/little-cute-cat-cartoon-character_1308-140198.jpg", isCorrect: false },
          { option: "https://static.vecteezy.com/system/resources/previews/012/352/541/non_2x/cute-rabbit-cartoon-holding-a-carrot-vector.jpg", isCorrect: false },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: true },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: false },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
    ],
  },
  {
    level: "Visual Match",
    type: "audio",
    questions: [
      {
        audioPath: "https://png.pngtree.com/png-clipart/20231021/original/pngtree-cute-cartoon-dog-png-file-png-image_13395067.png",
        options: [
          { option: "https://img.freepik.com/free-vector/little-cute-cat-cartoon-character_1308-140198.jpg", isCorrect: false },
          { option: "https://t3.ftcdn.net/jpg/00/63/09/14/360_F_63091473_n532l5yakYHuA6fJue4OMmhkI9eWG6Eu.jpg", isCorrect: false },
          { option: "https://www.shutterstock.com/image-vector/cartoon-cute-baby-dog-sitting-600nw-2162378921.jpg", isCorrect: true },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
    ],
  },
  {
    level: "Sound Match",
    questions: [
      {
        audioPath: "audio/cat-meow.mp3",
        options: [
          { option: "audio/dogAudio.mp3", isCorrect: false },
          { option: "audio/cat.mp3", isCorrect: false },
          { option: "audio/lion.mp3", isCorrect: true },
        ],
      },
      {
        audioPath: "/assets/audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
    ],
  },
  {
    level: "Sound Match Segmenting",
    questions: [
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
    ],
  },
  {
    level: "Sound Letter Match",
    questions: [
      {
        audioPath: "text",
        options: [
          { option: "audio/dogAudio.mp3", isCorrect: false },
          { option: "audio/cat.mp3", isCorrect: false },
          { option: "audio/lion.mp3", isCorrect: true },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
    ],
  },
  {
    level: "Comprehension",
    questions: [
      {
        audioPath: "Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip,Lorem ipsum dolor sit amet, consectetur adip. so pleases provide the answer for this paragraph.",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
    ],
  },
  {
    level: "Level7",
    questions: [
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
    ],
  },
  {
    level: "Level8",
    questions: [
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
      {
        audioPath: "audio/sample.mp3",
        options: [
          { option: "Answer 1", isCorrect: false },
          { option: "Answer 2", isCorrect: false },
          { option: "Answer 3", isCorrect: true },
        ],
      },
    ],
  },
];
