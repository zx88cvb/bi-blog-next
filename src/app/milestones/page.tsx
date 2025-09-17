import type { Metadata } from 'next'
import { Calendar, Trophy, Star, Code, BookOpen, Users, Briefcase, Presentation } from 'lucide-react'
import { getMilestonesData } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: '成长里程碑 | HaydenBi',
  description: '记录个人技术成长历程、项目里程碑、学习成就与职业发展的重要节点时间线',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '成长里程碑 | HaydenBi',
    description: '记录个人技术成长历程、项目里程碑、学习成就与职业发展的重要节点时间线',
    type: 'website',
    url: '/milestones',
    siteName: 'HaydenBi',
    locale: 'zh_CN',
    images: [
      {
        url: 'https://r2.haydenbi.com/logo/logo.png',
        width: 548,
        height: 698,
        alt: 'HaydenBi - 成长里程碑',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '成长里程碑 | HaydenBi',
    description: '记录个人技术成长历程、项目里程碑、学习成就与职业发展的重要节点时间线',
    images: ['https://r2.haydenbi.com/logo/logo.png'],
  },
}

const getIcon = (type: string) => {
  switch (type) {
    case 'career':
      return Briefcase
    case 'project':
      return Code
    case 'learning':
      return BookOpen
    case 'contribution':
      return Users
    case 'presentation':
      return Presentation
    default:
      return Star
  }
}

const getCategoryInfo = (type: string, categories: Array<{ type: string; name: string; color: string }>) => {
  const category = categories.find(cat => cat.type === type)
  return category || { name: '其他', color: '#6b7280' }
}

export default function MilestonesPage() {
  const { milestones, categories } = getMilestonesData()
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">里程碑</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            记录我在技术道路上的重要节点和成长历程
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => {
            const Icon = getIcon(milestone.type)
            const categoryInfo = getCategoryInfo(milestone.type, categories)
            const isEven = index % 2 === 0
            
            return (
              <div key={milestone.id} className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                {/* Content */}
                <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader className="pb-4">
                      <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <Badge 
                          variant="secondary" 
                          className="text-xs"
                          style={{ backgroundColor: `${categoryInfo.color}20`, color: categoryInfo.color }}
                        >
                          {categoryInfo.name}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDate(milestone.date)}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {milestone.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4">
                        {milestone.description}
                      </p>
                      {milestone.details && milestone.details.length > 0 && (
                        <>
                          <Separator className="my-4" />
                          <div className="space-y-2">
                            {milestone.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Node */}
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 bg-background border-4 border-primary rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-border" />
                  )}
                </div>

                {/* Spacer for desktop */}
                <div className="flex-1 hidden md:block" />
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <Card className="mt-16 bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">持续成长</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              这些里程碑只是我技术之路的开始。我相信未来还会有更多精彩的成就等待着我。
              让我们一起期待下一个里程碑的到来！
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}