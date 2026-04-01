import { DatabaseIcon } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { TableShell } from '@/components/admin/TableShell.jsx';
import { Button } from '@/components/ui/Button.jsx';

export function AdminModulePage({ title, resource, description }) {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={title}
        description={description}
        action={
          <Button>
            Add New {resource.slice(0, -1)}
          </Button>
        }
      />

      <TableShell headings={['Name', 'Status', 'Date Modified', 'Actions']}>
        <tr>
          <td colSpan={4} className="p-0">
            <EmptyState
              icon={DatabaseIcon}
              title={`No ${resource} found`}
              message={`Backend scaffolded. Data binding for ${resource} will be implemented in Phase 4 CRUD integrations.`}
              action={<Button variant="outline">Learn More</Button>}
            />
          </td>
        </tr>
      </TableShell>
    </div>
  );
}