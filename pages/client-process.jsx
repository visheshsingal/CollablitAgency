import ClientPortal from '../components/ClientPortal.jsx'
import { ProcessView } from '../components/ClientWorkspace.jsx'

export default function ClientProcessPage() {
  return (
    <ClientPortal title="Project Journey | Collablit Solutions" kicker="Project Journey">
      {({ client }) => <ProcessView client={client} />}
    </ClientPortal>
  )
}
