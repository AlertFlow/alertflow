import { Heading } from '@/components/ui/heading';
import { Badge } from "@/components/ui/badge"
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Icons
import { KeySquare, Play, User, PencilRuler } from 'lucide-react';

import GetProject from '../utils/GetProjectData';
import GetProjectApiKeys from '../utils/GetProjectApiKeys';
import GetProjectRunners from '../utils/GetProjectRunners';

export async function Project({ projectId }: any) {
  const project = await GetProject(projectId)
  const api_keys = await GetProjectApiKeys(projectId)
  const runners = await GetProjectRunners(projectId)

  return (
    <>
      <div className="flex items-start gap-6">
        <Heading
          title={`${project.name}`}
          description={`${project.description}`}
        />
        <Badge className="mt-2">Project ID: {projectId}</Badge>
      </div>
      <Separator />
      <div className="grid lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-4">
                  <User />
                  <div>
                    <CardTitle>Members</CardTitle>
                    <CardDescription>Amount of Members</CardDescription>
                  </div>
                </div>
                <h4>{project.members.length}</h4>
              </div>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-4">
                  <Play />
                  <div>
                    <CardTitle>Runners</CardTitle>
                    <CardDescription>Available Runners</CardDescription>
                  </div>
                </div>
                <h4>{runners.length}</h4>
              </div>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-4">
                  <KeySquare />
                  <div>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>Active API Keys</CardDescription>
                  </div>
                </div>
                <h4>{api_keys.length}</h4>
              </div>
            </CardHeader>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-4">
                  <PencilRuler />
                  <div>
                    <CardTitle>Created At</CardTitle>
                    <CardDescription>Creation Date of Project</CardDescription>
                  </div>
                </div>
                <h4>{new Date(project.created_at).toLocaleString()}</h4>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  )
}