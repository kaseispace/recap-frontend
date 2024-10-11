export interface createReflectionRequestBody {
  course_date_id: number
  reflections: ChatMessage[]
}

export interface updateReflectionRequestBody {
  message: string
}

export const mockStudentReflectionsData = [
  {
    id: 1,
    course_id: 1,
    course_number: '第1回',
    course_date: '2024/4/1',
    is_reflection: true,
    reflections: [
      {
        id: 1,
        course_date_id: 1,
        message: 'こんにちは！',
        message_type: 'bot',
        message_time: 0
      },
      {
        id: 2,
        course_date_id: 1,
        message: '振り返りを始めましょう！',
        message_type: 'bot',
        message_time: 0
      },
      {
        id: 3,
        course_date_id: 1,
        message: '今日の授業で新しく学んだことは何ですか？それを自分の言葉で説明してみてください。',
        message_type: 'bot',
        message_time: 0
      },
      {
        id: 4,
        course_date_id: 1,
        message:
            '今日の授業では、平方根について学びました。平方根とは、ある数の2乗が与えられた数となる数のことを指します。例えば、4の平方根は2です。',
        message_type: 'user',
        message_time: 4.55
      },
      {
        id: 5,
        course_date_id: 1,
        message:
            '今日学んだ内容を使って、具体的な問題を解くことができますか？可能であれば、その問題と解答を教えてください。',
        message_type: 'bot',
        message_time: 0
      },
      {
        id: 6,
        course_date_id: 1,
        message: '問題: 9の平方根は何ですか？ 解答: 9の平方根は3です。',
        message_type: 'user',
        message_time: 4.23
      },
      {
        id: 7,
        course_date_id: 1,
        message: 'お疲れ様でした！',
        message_type: 'bot',
        message_time: 0
      }
    ]
  },
  {
    id: 2,
    course_id: 1,
    course_number: '第2回',
    course_date: '2024/4/8',
    is_reflection: true,
    reflections: [
      {
        id: 8,
        course_date_id: 2,
        message: 'こんにちは！',
        message_type: 'bot',
        message_time: 0
      },
      {
        id: 9,
        course_date_id: 2,
        message: '振り返りを始めましょう！',
        message_type: 'bot',
        message_time: 0
      },
      {
        id: 10,
        course_date_id: 2,
        message: '今日の授業で新しく学んだことは何ですか？それを自分の言葉で説明してみてください。',
        message_type: 'bot',
        message_time: 0
      },
      {
        id: 11,
        course_date_id: 2,
        message: '今日の授業では、円周率について学びました。円周率は、円の直径と円周の比率を表す数で、約3.14です。',
        message_type: 'user',
        message_time: 4.45
      },
      {
        id: 12,
        course_date_id: 2,
        message:
            '今日学んだ内容を使って、具体的な問題を解くことができますか？可能であれば、その問題と解答を教えてください。',
        message_type: 'bot',
        message_time: 0
      },
      {
        id: 13,
        course_date_id: 2,
        message:
            '問題: 直径が6cmの円の円周の長さは何cmですか？ 解答: 円周の長さは直径に円周率を掛けたものなので、6cm * 3.14 = 18.84cmです。',
        message_type: 'user',
        message_time: 5.72
      },
      {
        id: 14,
        course_date_id: 2,
        message: 'お疲れ様でした！',
        message_type: 'bot',
        message_time: 0
      }
    ]
  }
]

export const chatMessagesData: ChatMessage[] = [
  {
    message: 'こんにちは！',
    message_type: 'bot',
    message_time: 0
  },
  {
    message: '振り返りを始めましょう！',
    message_type: 'bot',
    message_time: 0
  },
  {
    message: '今日の授業で新しく学んだことは何ですか？それを自分の言葉で説明してみてください。',
    message_type: 'bot',
    message_time: 0
  },
  {
    message: '今日の授業では、三角形の面積について学びました。三角形の面積は、底辺と高さを掛けて2で割ったものです。',
    message_type: 'user',
    message_time: 4.1
  },
  {
    message:
        '今日学んだ内容を使って、具体的な問題を解くことができますか？可能であれば、その問題と解答を教えてください。',
    message_type: 'bot',
    message_time: 0
  },
  {
    message:
        '問題: 底辺が10cm、高さが5cmの三角形の面積は何平方cmですか？ 解答: 三角形の面積は底辺と高さを掛けて2で割ったものなので、10cm * 5cm / 2 = 25平方cmです。',
    message_type: 'user',
    message_time: 4.56
  },
  {
    message: 'お疲れ様でした！',
    message_type: 'bot',
    message_time: 0
  }
]

export const mockCreatedReflectionsData = {
  id: 3,
  course_id: 1,
  course_number: '第3回',
  course_date: '2024/4/1',
  reflections: [
    {
      id: 15,
      course_date_id: 3,
      message: 'こんにちは！',
      message_type: 'bot',
      message_time: 0
    },
    {
      id: 16,
      course_date_id: 3,
      message: '振り返りを始めましょう！',
      message_type: 'bot',
      message_time: 0
    },
    {
      id: 17,
      course_date_id: 3,
      message: '今日の授業で新しく学んだことは何ですか？それを自分の言葉で説明してみてください。',
      message_type: 'bot',
      message_time: 0
    },
    {
      id: 18,
      course_date_id: 3,
      message: '今日の授業では、三角形の面積について学びました。三角形の面積は、底辺と高さを掛けて2で割ったものです。',
      message_type: 'user',
      message_time: 4.1
    },
    {
      id: 19,
      course_date_id: 3,
      message:
          '今日学んだ内容を使って、具体的な問題を解くことができますか？可能であれば、その問題と解答を教えてください。',
      message_type: 'bot',
      message_time: 0
    },
    {
      id: 20,
      course_date_id: 3,
      message:
          '問題: 底辺が10cm、高さが5cmの三角形の面積は何平方cmですか？ 解答: 三角形の面積は底辺と高さを掛けて2で割ったものなので、10cm * 5cm / 2 = 25平方cmです。',
      message_type: 'user',
      message_time: 4.56
    },
    {
      id: 21,
      course_date_id: 3,
      message: 'お疲れ様でした！',
      message_type: 'bot',
      message_time: 0
    }
  ]
}

export const mockAllStudentReflectionStatusData = [
  {
    course_date: {
      id: 1,
      course_id: 1,
      course_number: '第1回',
      course_date: '2024/4/1',
      is_reflection: true,
      users_reflections: [
        {
          id: 1,
          name: '佐藤太郎',
          reflections: [
            {
              id: 1,
              course_date_id: 1,
              message: 'こんにちは！',
              message_type: 'bot',
              message_time: 0
            },
            {
              id: 2,
              course_date_id: 1,
              message: '振り返りを始めましょう！',
              message_type: 'bot',
              message_time: 0
            },
            {
              id: 3,
              course_date_id: 1,
              message: '今日の授業で最も印象に残ったことは何ですか？',
              message_type: 'bot',
              message_time: 0
            },
            {
              id: 4,
              course_date_id: 1,
              message: '今日の授業で最も印象に残ったのは、再帰関数の使い方です。',
              message_type: 'user',
              message_time: 4
            },
            {
              id: 5,
              course_date_id: 1,
              message: '今日学んだことを実際のプロジェクトや問題にどのように適用できますか？ ',
              message_type: 'bot',
              message_time: 0
            },
            {
              id: 6,
              course_date_id: 1,
              message:
                  '再帰関数は、データ構造が階層的な場合や、問題が自然に小さなサブタスクに分割できる場合に特に有用だと思います。',
              message_type: 'user',
              message_time: 4
            },
            {
              id: 7,
              course_date_id: 1,
              message: 'お疲れ様でした！',
              message_type: 'bot',
              message_time: 4
            }
          ]
        },
        {
          id: 2,
          name: '佐藤次郎',
          reflections: [
            {
              id: 8,
              course_date_id: 1,
              message: 'こんにちは！',
              message_type: 'bot',
              message_time: 0
            },
            {
              id: 9,
              course_date_id: 1,
              message: '振り返りを始めましょう！',
              message_type: 'bot',
              message_time: 0
            },
            {
              id: 10,
              course_date_id: 1,
              message: '今日の授業で最も印象に残ったことは何ですか？',
              message_type: 'bot',
              message_time: 0
            },
            {
              id: 11,
              course_date_id: 1,
              message: 'オブジェクト指向プログラミングの概念です。',
              message_type: 'user',
              message_time: 4
            },
            {
              id: 12,
              course_date_id: 1,
              message: '今日学んだことを実際のプロジェクトや問題にどのように適用できますか？ ',
              message_type: 'bot',
              message_time: 0
            },
            {
              id: 13,
              course_date_id: 1,
              message:
                  'オブジェクト指向プログラミングは、大規模なソフトウェアプロジェクトにおいて非常に有用です。それにより、コードの再利用性が向上し、メンテナンスが容易になります。',
              message_type: 'user',
              message_time: 4
            },
            {
              id: 14,
              course_date_id: 1,
              message: 'お疲れ様でした！',
              message_type: 'bot',
              message_time: 4
            }
          ]
        }
      ]
    }
  },
  {
    course_date: {
      id: 2,
      course_id: 1,
      course_number: '第2回',
      course_date: '2024/4/8',
      is_reflection: false,
      users_reflections: [
        { id: 1, name: '佐藤太郎', reflections: [] },
        { id: 2, name: '佐藤次郎', reflections: [] }
      ]
    }
  }
]

export const mockAllStudentReflectionsData = [
  {
    id: 1,
    name: '佐藤太郎',
    user_reflections: [
      {
        id: 1,
        course_id: 1,
        course_number: '第1回',
        course_date: '2024/4/1',
        is_reflection: true,
        reflections: [
          {
            id: 1,
            course_date_id: 1,
            message: 'こんにちは！',
            message_type: 'bot',
            message_time: 0
          },
          {
            id: 2,
            course_date_id: 1,
            message: '振り返りを始めましょう！',
            message_type: 'bot',
            message_time: 0
          },
          {
            id: 3,
            course_date_id: 1,
            message: '今日の授業で最も印象に残ったことは何ですか？',
            message_type: 'bot',
            message_time: 0
          },
          {
            id: 4,
            course_date_id: 1,
            message: '今日の授業で最も印象に残ったのは、再帰関数の使い方です。',
            message_type: 'user',
            message_time: 4
          },
          {
            id: 5,
            course_date_id: 1,
            message: '今日学んだことを実際のプロジェクトや問題にどのように適用できますか？ ',
            message_type: 'bot',
            message_time: 0
          },
          {
            id: 6,
            course_date_id: 1,
            message:
                '再帰関数は、データ構造が階層的な場合や、問題が自然に小さなサブタスクに分割できる場合に特に有用だと思います。',
            message_type: 'user',
            message_time: 4
          },
          {
            id: 7,
            course_date_id: 1,
            message: 'お疲れ様でした！',
            message_type: 'bot',
            message_time: 4
          }
        ]
      },
      {
        id: 2,
        course_id: 1,
        course_number: '第2回',
        course_date: '2024/4/8',
        is_reflection: false,
        reflections: []
      }
    ]
  },
  {
    id: 2,
    name: '佐藤次郎',
    user_reflections: [
      {
        id: 1,
        course_id: 1,
        course_number: '第1回',
        course_date: '2024/4/1',
        is_reflection: true,
        reflections: [
          {
            id: 8,
            course_date_id: 1,
            message: 'こんにちは！',
            message_type: 'bot',
            message_time: 0
          },
          {
            id: 9,
            course_date_id: 1,
            message: '振り返りを始めましょう！',
            message_type: 'bot',
            message_time: 0
          },
          {
            id: 10,
            course_date_id: 1,
            message: '今日の授業で最も印象に残ったことは何ですか？',
            message_type: 'bot',
            message_time: 0
          },
          {
            id: 11,
            course_date_id: 1,
            message: 'オブジェクト指向プログラミングの概念です。',
            message_type: 'user',
            message_time: 4
          },
          {
            id: 12,
            course_date_id: 1,
            message: '今日学んだことを実際のプロジェクトや問題にどのように適用できますか？ ',
            message_type: 'bot',
            message_time: 0
          },
          {
            id: 13,
            course_date_id: 1,
            message:
                'オブジェクト指向プログラミングは、大規模なソフトウェアプロジェクトにおいて非常に有用です。それにより、コードの再利用性が向上し、メンテナンスが容易になります。',
            message_type: 'user',
            message_time: 4
          },
          {
            id: 14,
            course_date_id: 1,
            message: 'お疲れ様でした！',
            message_type: 'bot',
            message_time: 4
          }
        ]
      },
      {
        id: 2,
        course_id: 1,
        course_number: '第2回',
        course_date: '2024/4/8',
        is_reflection: false,
        reflections: []
      }
    ]
  }
]
