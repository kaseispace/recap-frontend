export interface createReflectionRequestBody {
  reflection: {
    course_date_id: number
    reflections: ChatMessage[]
  }
}

export interface updateReflectionRequestBody {
  message: string
}

export const MOCK_STUDENT_REFLECTIONS = [
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

// みんなの振り返り
export const MOCK_GROUP_REFLECTIONS = [
  {
    id: 1,
    course_id: 1,
    course_number: '第1回',
    course_date: '2024/4/1',
    is_reflection: true,
    users_reflections: [
      {
        user_id: 1,
        name: '田中太郎',
        reflections: [
          {
            id: 1,
            user_id: 1,
            course_id: 1,
            course_date_id: 1,
            message: 'こんにちは！',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 2,
            user_id: 1,
            course_id: 1,
            course_date_id: 1,
            message: '振り返りを始めましょう！',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 3,
            user_id: 1,
            course_id: 1,
            course_date_id: 1,
            message: '今日の授業で最も印象に残ったことは何ですか？',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 4,
            user_id: 1,
            course_id: 1,
            course_date_id: 1,
            message: '今日の授業で最も印象に残ったのは、再帰関数の使い方です。',
            message_type: 'user',
            message_time: 4.0
          },
          {
            id: 5,
            user_id: 1,
            course_id: 1,
            course_date_id: 1,
            message: '今日学んだことを実際のプロジェクトや問題にどのように適用できますか？',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 6,
            user_id: 1,
            course_id: 1,
            course_date_id: 1,
            message: '再帰関数は、データ構造が階層的な場合や、問題が自然に小さなサブタスクに分割できる場合に特に有用だと思います。',
            message_type: 'user',
            message_time: 5.0
          },
          {
            id: 7,
            user_id: 1,
            course_id: 1,
            course_date_id: 1,
            message: 'お疲れ様でした！',
            message_type: 'bot',
            message_time: 0.0
          }
        ]
      },
      {
        user_id: 2,
        name: '佐藤花子',
        reflections: [
          {
            id: 8,
            user_id: 2,
            course_id: 1,
            course_date_id: 1,
            message: 'こんにちは！',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 9,
            user_id: 2,
            course_id: 1,
            course_date_id: 1,
            message: '振り返りを始めましょう！',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 10,
            user_id: 2,
            course_id: 1,
            course_date_id: 1,
            message: '今日の授業で最も印象に残ったことは何ですか？',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 11,
            user_id: 2,
            course_id: 1,
            course_date_id: 1,
            message: 'オブジェクト指向プログラミングの概念です。',
            message_type: 'user',
            message_time: 4.0
          },
          {
            id: 12,
            user_id: 2,
            course_id: 1,
            course_date_id: 1,
            message: '今日学んだことを実際のプロジェクトや問題にどのように適用できますか？',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 13,
            user_id: 2,
            course_id: 1,
            course_date_id: 1,
            message: 'オブジェクト指向プログラミングは、大規模なソフトウェアプロジェクトにおいて非常に有用です。それにより、コードの再利用性が向上し、メンテナンスが容易になります。',
            message_type: 'user',
            message_time: 7.0
          },
          {
            id: 14,
            user_id: 2,
            course_id: 1,
            course_date_id: 1,
            message: 'お疲れ様でした！',
            message_type: 'bot',
            message_time: 0.0
          }
        ]
      }
    ]
  },
  {
    id: 2,
    course_id: 1,
    course_number: '第2回',
    course_date: '2024/4/8',
    is_reflection: true,
    users_reflections: [
      {
        user_id: 1,
        name: '田中太郎',
        reflections: [
          {
            id: 15,
            user_id: 1,
            course_id: 1,
            course_date_id: 2,
            message: 'こんにちは！',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 16,
            user_id: 1,
            course_id: 1,
            course_date_id: 2,
            message: '振り返りを始めましょう！',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 17,
            user_id: 1,
            course_id: 1,
            course_date_id: 2,
            message: '今日の授業で新しく学んだことは何ですか？それを自分の言葉で説明してみてください。',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 18,
            user_id: 1,
            course_id: 1,
            course_date_id: 2,
            message: '今日の授業では、円周率について学びました。円周率は、円の直径と円周の比率を表す数で、約3.14です。',
            message_type: 'user',
            message_time: 6.0
          },
          {
            id: 19,
            user_id: 1,
            course_id: 1,
            course_date_id: 2,
            message: '今日学んだ内容を使って、具体的な問題を解くことができますか？可能であれば、その問題と解答を教えてください。',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 20,
            user_id: 1,
            course_id: 1,
            course_date_id: 2,
            message: '問題: 直径が6cmの円の円周の長さは何cmですか？ 解答: 円周の長さは直径に円周率を掛けたものなので、6cm * 3.14 = 18.84cmです。',
            message_type: 'user',
            message_time: 10.0
          },
          {
            id: 21,
            user_id: 1,
            course_id: 1,
            course_date_id: 2,
            message: 'お疲れ様でした！',
            message_type: 'bot',
            message_time: 0.0
          }
        ]
      },
      {
        user_id: 2,
        name: '佐藤花子',
        reflections: [
          {
            id: 22,
            user_id: 2,
            course_id: 1,
            course_date_id: 2,
            message: 'こんにちは！',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 23,
            user_id: 2,
            course_id: 1,
            course_date_id: 2,
            message: '振り返りを始めましょう！',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 24,
            user_id: 2,
            course_id: 1,
            course_date_id: 2,
            message: '今日の授業で新しく学んだことは何ですか？それを自分の言葉で説明してみてください。',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 25,
            user_id: 2,
            course_id: 1,
            course_date_id: 2,
            message: '今日の授業では、平方根について学びました。平方根とは、ある数の2乗が与えられた数となる数のことを指します。例えば、4の平方根は2です。',
            message_type: 'user',
            message_time: 12.0
          },
          {
            id: 26,
            user_id: 2,
            course_id: 1,
            course_date_id: 2,
            message: '今日学んだ内容を使って、具体的な問題を解くことができますか？可能であれば、その問題と解答を教えてください。',
            message_type: 'bot',
            message_time: 0.0
          },
          {
            id: 27,
            user_id: 2,
            course_id: 1,
            course_date_id: 2,
            message: '問題: 9の平方根は何ですか？ 解答: 9の平方根は3です。',
            message_type: 'user',
            message_time: 7.0
          },
          {
            id: 28,
            user_id: 2,
            course_id: 1,
            course_date_id: 2,
            message: 'お疲れ様でした！',
            message_type: 'bot',
            message_time: 0.0
          }
        ]
      }
    ]
  }
]
