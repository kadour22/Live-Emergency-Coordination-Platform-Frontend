import { MoreVertical, TypeIcon } from 'lucide-react'
import React from 'react'

const Testing = () => {
  return (
    <div>
                          <tr lassName="transition-colors hover:bg-teal-50/40">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full `}>
                                  <TypeIcon className="h-4 w-4" strokeWidth={2} />
                                </span>
                                <div className="min-w-0">
                                  <p className="font-semibold text-stone-800">label</p>
                                  <p className="max-w-xs truncate text-xs text-stone-500">description</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-stone-600">Reporter</td>
                            <td className="px-6 py-4 font-mono text-xs text-stone-500">location</td>
                            <td className="px-6 py-4 text-stone-500">date</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.tint}`}>
                                {/* <StatusIcon className={`h-3 w-3 ${incident.status === 'in_progress' ? 'animate-spin' : ''}`} strokeWidth={2.5} />
                                {status.label} */}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button className="rounded-md p-1.5 text-stone-400 hover:bg-teal-50 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600" aria-label="More actions">
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
    </div>
  )
}

export default Testing
