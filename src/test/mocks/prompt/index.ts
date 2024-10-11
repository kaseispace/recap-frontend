export interface promptRequestBody {
  title: string
  contents: PromptContent[]
}

export const mockPromptsData = [
  {
    id: 1,
    course_id: 1,
    title: '哲学入門の振り返り',
    active: true,
    prompt_questions: [
      { id: 1, prompt_id: 1, content: '今日の授業で一番印象に残った哲学者は誰でしたか？' },
      { id: 2, prompt_id: 1, content: 'その哲学者の主張を簡単に説明してください。' }
    ]
  },
  {
    id: 2,
    course_id: 2,
    title: '経済学の基礎についての振り返り',
    active: false,
    prompt_questions: [
      { id: 3, prompt_id: 2, content: '供給と需要の法則について説明してください。' },
      { id: 4, prompt_id: 2, content: 'インフレーションとは何ですか？' },
      { id: 5, prompt_id: 2, content: '経済学で学んだ新しい概念を一つ挙げてください。' }
    ]
  },
  {
    id: 3,
    course_id: 3,
    title: '世界史の振り返り',
    active: false,
    prompt_questions: [
      { id: 6, prompt_id: 3, content: '今日学んだ歴史的な出来事を一つ挙げてください。' },
      { id: 7, prompt_id: 3, content: 'その出来事が現代にどのような影響を与えていると思いますか？' }
    ]
  },
  {
    id: 4,
    course_id: 4,
    title: '生物学の基礎についての振り返り',
    active: false,
    prompt_questions: [
      { id: 8, prompt_id: 4, content: '細胞の構造について説明してください。' },
      { id: 9, prompt_id: 4, content: 'DNAの役割について説明してください。' },
      { id: 10, prompt_id: 4, content: '生物学で学んだ新しい概念を一つ挙げてください。' }
    ]
  },
  {
    id: 5,
    course_id: 5,
    title: '文学の振り返り',
    active: false,
    prompt_questions: [
      { id: 11, prompt_id: 5, content: '今日の授業で読んだ作品の主題は何でしたか？' },
      { id: 12, prompt_id: 5, content: 'その作品の中で一番印象に残ったシーンを説明してください。' },
      { id: 13, prompt_id: 5, content: 'その作品から学んだことや感じたことを教えてください。' }
    ]
  }
]

export const mockStudentPromptsData = [
  '「データサイエンス」とは何だと思いますか？',
  'データサイエンスを学ぶことで何を達成したいですか？',
  'これまでに統計やプログラミングに関する経験はありますか？それはどのようなものでしたか？'
]
