import StatsCard from '../StatsCard'
import { Users } from 'lucide-react'

export default function StatsCardExample() {
  return (
    <div className="p-4">
      <StatsCard 
        title="Active Users" 
        value={12} 
        icon={<Users className="h-6 w-6 text-primary" />}
      />
    </div>
  )
}
