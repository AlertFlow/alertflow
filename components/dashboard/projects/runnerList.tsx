import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from '@/components/ui/label'
import { BorderBeam } from "@/components/magicui/border-beam";

// Icons
import { HeartPulse, Forklift, Milestone, BookPlus } from 'lucide-react';

export function RunnerList({ runners }: any) {
  console.log(runners)
  return (
    <main className="mt-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Self-Hosted</h3>
      <div className="grid lg:grid-cols-4 justify-between items-center gap-4 mb-6">
        {runners.filter((runner: any) => runner.alertflow_runner === false).map((runner: any) => (
          <div key={runner.id} className="relative rounded-xl col-span-1 mt-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{runner.name}</CardTitle>
                  <div className="flex gap-2">
                    <Badge style={{ color: runner.registered ? "green" : "red" }} variant={"outline"}>{runner.registered ? "Registered" : "Not Registered"}</Badge>
                    {runner.active && <Badge style={{ color: "#1355ab" }} variant={"outline"}>Active</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <Milestone className="h-5 w-5" />
                      <Label>Version</Label>
                    </div>
                    <p>{runner.runner_version}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <HeartPulse className="h-5 w-5" />
                      <Label>Last Heartbeat</Label>
                    </div>
                    <p>{new Date(runner.last_heartbeat.Time).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <Forklift className="h-5 w-5" />
                      <Label>Available Actions</Label>
                    </div>
                    <p>{runner.available_actions.length}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <BookPlus className="h-5 w-5" />
                      <Label>Available Payload Injectors</Label>
                    </div>
                    <p>{runner.available_payload_injectors.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <BorderBeam size={250} borderWidth={2.0} duration={12} delay={9} colorFrom={runner.registered ? runner.active ? "#1355ab" : "#008000" : "#ff0000"} colorTo={runner.registered ? runner.active ? "#1355ab" : "#008000" : "#ff0000"} />
          </div>
        ))}
      </div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">AlertFlow Provisioned</h3>
      <div className="grid lg:grid-cols-4 justify-between items-center gap-4 mb-6">
        {runners.filter((runner: any) => runner.alertflow_runner === true).map((runner: any) => (
          <div key={runner.id} className="col-span-1 mt-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{runner.name}</CardTitle>
                  <Badge style={{ color: runner.registered ? "green" : "red" }} variant={"outline"}>{runner.registered ? "Registered" : "Not Registered"}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <Milestone className="h-5 w-5" />
                      <Label>Version</Label>
                    </div>
                    <p>{runner.runner_version}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <HeartPulse className="h-5 w-5" />
                      <Label>Last Heartbeat</Label>
                    </div>
                    <p>{new Date(runner.last_heartbeat.Time).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <Forklift className="h-5 w-5" />
                      <Label>Available Actions</Label>
                    </div>
                    <p>{runner.available_actions.length}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <BookPlus className="h-5 w-5" />
                      <Label>Available Payload Injectors</Label>
                    </div>
                    <p>{runner.available_payload_injectors.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </main >
  )
}