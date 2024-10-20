import { registerEndpoint } from '@nuxt/test-utils/runtime'
import { readBody } from 'h3'
import { emptyDataUUID, dataUUID } from '@/test/mocks/index'
import { mockPromptsData, mockStudentPromptsData } from '@/test/mocks/prompt/index'
import type { createPromptRequestBody, updatePromptRequestBody } from '@/test/mocks/prompt/index'

const config = useRuntimeConfig()

export const registerPromptEndpoints = () => {
  registerEndpoint(`${config.public.devBackendUrl}/prompts/teacher_prompts?uuid=${emptyDataUUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.devBackendUrl}/prompts/teacher_prompts?uuid=${dataUUID}`, {
    method: 'GET',
    handler: () => {
      return mockPromptsData
    }
  })

  registerEndpoint(`${config.public.devBackendUrl}/prompts/student_prompt?uuid=${emptyDataUUID}`, {
    method: 'GET',
    handler: () => {
      return []
    }
  })

  registerEndpoint(`${config.public.devBackendUrl}/prompts/student_prompt?uuid=${dataUUID}`, {
    method: 'GET',
    handler: () => {
      return mockStudentPromptsData
    }
  })

  // プロンプトの作成
  registerEndpoint(`${config.public.devBackendUrl}/prompts`, {
    method: 'POST',
    handler: async (event) => {
      const body = await readBody<createPromptRequestBody>(event)
      return {
        id: 1,
        title: body.prompt.title,
        active: false,
        prompt_questions: body.prompt.prompt_questions_attributes
      }
    }
  })

  // プロンプトの状態の更新
  registerEndpoint(`${config.public.devBackendUrl}/prompts/2/activate_prompt`, {
    method: 'PATCH',
    handler: () => {
      const prompt = usePromptApi()
      const activePrompt = prompt.prompts.value?.find(prompt => prompt.id === 2)
      return {
        id: activePrompt?.id,
        title: activePrompt?.title,
        active: !activePrompt?.active,
        prompt_questions: activePrompt?.prompt_questions
      }
    }
  })

  // プロンプトの編集
  registerEndpoint(`${config.public.devBackendUrl}/prompts/1`, {
    method: 'PATCH',
    handler: async (event) => {
      const body = await readBody<updatePromptRequestBody>(event)
      const filteredQuestions = body.prompt_questions_attributes.filter(question => !question._destroy)
      return {
        id: 1,
        title: body.title,
        active: true,
        prompt_questions: filteredQuestions
      }
    }
  })

  // プロンプトの削除
  registerEndpoint(`${config.public.devBackendUrl}/prompts/1`, {
    method: 'DELETE',
    handler: () => {
      const prompt = usePromptApi()
      const deletePrompt = prompt.prompts.value?.find(prompt => prompt.id === 1)
      if (deletePrompt) {
        return {}
      }
    }
  })
}
