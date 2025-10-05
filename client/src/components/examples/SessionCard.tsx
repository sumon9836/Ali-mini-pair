import SessionCard from '../SessionCard'

export default function SessionCardExample() {
  return (
    <div className="p-4">
      <SessionCard 
        phoneNumber="917003816486" 
        jid="917003816486:92@s.whatsapp.net" 
        connected={true}
      />
    </div>
  )
}
