export const MOCK_USERS_LIST = [
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

export const MOCK_USERS_REFLECTION = {
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
}

export const MOCK_USER_NOT_REFLECTION_1 = { id: 1, name: '佐藤太郎' }
export const MOCK_USER_NOT_REFLECTION_2 = { id: 2, name: '佐藤次郎' }

export const MOCK_COURSE_DATE_REFLECTIONS_1 = {
  id: 1,
  course_id: 1,
  course_number: '第1回',
  course_date: '2024/4/15',
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
      reflections: []
    }
  ]
}

export const MOCK_COURSE_DATE_REFLECTIONS_2 = {
  id: 1,
  course_id: 1,
  course_number: '第6回',
  course_date: '2024/5/20',
  is_reflection: true,
  users_reflections: [
    {
      id: 1,
      name: '佐藤太郎',
      reflections: []
    },
    {
      id: 2,
      name: '佐藤次郎',
      reflections: []
    }
  ]
}

export const MOCK_COURSE_DATE_NOT_REFLECTIONS = {
  id: 1,
  course_id: 1,
  course_number: '第1回',
  course_date: '2024/4/15',
  is_reflection: false,
  users_reflections: [
    {
      id: 1,
      name: '佐藤太郎',
      reflections: []
    },
    {
      id: 2,
      name: '佐藤次郎',
      reflections: []
    }
  ]
}
