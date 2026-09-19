import ClientPortal from '../components/ClientPortal.jsx'
import { MeetingsView } from '../components/ClientWorkspace.jsx'

export default function ClientMeetingsPage() {
  return (
    <ClientPortal title="Meetings | Collablit Solutions" kicker="Meetings">
      {({ booking }) => <MeetingsView booking={booking} />}
    </ClientPortal>
  )
}
