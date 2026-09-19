import ClientPortal from '../components/ClientPortal.jsx'
import { OverviewView } from '../components/ClientWorkspace.jsx'

export default function ClientDashboardPage() {
  return (
    <ClientPortal title="Workspace | Collablit Solutions" kicker="Overview">
      {({ client, booking }) => <OverviewView client={client} booking={booking} />}
    </ClientPortal>
  )
}
