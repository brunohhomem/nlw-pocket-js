import { OutlineButton } from './ui/outline-button'
import { Plus } from 'lucide-react'

export function PendingGoals() {
  return (
    <div className="flex flex-wrap gap-3">
      <OutlineButton>
        <Plus className="size-4 text-zinc-600" />
        Meditar
      </OutlineButton>

      <OutlineButton>
        <Plus className="size-4 text-zinc-600" />
        Nadar
      </OutlineButton>

      <OutlineButton>
        <Plus className="size-4 text-zinc-600" />
        Praticar Exercícios
      </OutlineButton>
    </div>
  )
}
