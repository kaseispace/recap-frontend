export const usePromptApi = () => {
  const config = useRuntimeConfig()
  const prompts = useState<Prompt[] | null>('prompts', () => null)
  const activePrompt = useState<Prompt | null>('activePrompt', () => null)

  const getTeacherPrompts = async (uuid: string, idToken: string): Promise<Prompt[]> => {
    const data = await $fetch<Prompt[]>(`${config.public.backendUrl}/prompts/teacher_prompts?uuid=${uuid}`, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    return data
  }

  const getStudentPrompt = async (uuid: string, idToken: string): Promise<string[]> => {
    const data = await $fetch<string[]>(`${config.public.backendUrl}/prompts/student_prompt?uuid=${uuid}`, {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    return data
  }

  const createPrompt = async (uuid: string, title: string, contents: PromptContent[], idToken: string): Promise<Prompt> => {
    const requestBody = { uuid, prompt: { title, prompt_questions_attributes: contents } }
    const data = await $fetch<Prompt>(`${config.public.backendUrl}/prompts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const updatePrompt = async (
    promptId: number,
    title: string,
    prompt_questions: PromptContent[],
    idToken: string
  ): Promise<Prompt> => {
    const requestBody = { title, prompt_questions_attributes: prompt_questions }
    const data = await $fetch<Prompt>(`${config.public.backendUrl}/prompts/${promptId}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${idToken}` },
      body: requestBody
    })
    return data
  }

  const updateActivePrompt = async (promptId: number, idToken: string): Promise<void> => {
    await $fetch(`${config.public.backendUrl}/prompts/${promptId}/activate_prompt`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${idToken}` }
    })
  }

  const deletePrompt = async (promptId: number, idToken: string): Promise<void> => {
    await $fetch(`${config.public.backendUrl}/prompts/${promptId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${idToken}` }
    })
  }

  return {
    prompts,
    activePrompt,
    getTeacherPrompts,
    getStudentPrompt,
    createPrompt,
    updatePrompt,
    updateActivePrompt,
    deletePrompt
  }
}
