import ClientPortal from '../components/ClientPortal.jsx'
import { DocumentsView } from '../components/ClientWorkspace.jsx'

export default function ClientDocumentsPage() {
  return (
    <ClientPortal title="Documents | Collablit Solutions" kicker="Documents">
      {({ client }) => <DocumentsView client={client} />}
    </ClientPortal>
  )
}
