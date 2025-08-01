import { ExternalLink, Users, Heart, Globe, Mail } from 'lucide-react'
import { getFriendsData } from '@/lib/data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function FriendsPage() {
  const { friends } = getFriendsData()
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">友情链接</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            这里是我的技术朋友们，他们都是各自领域的专家，值得关注和学习
          </p>
        </div>

        {/* Friends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {friends.map((friend) => (
            <Card key={friend.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-white text-xl font-bold">
                      {friend.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {friend.name}
                    </CardTitle>
                    {friend.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {friend.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="line-clamp-2 mb-4">
                  {friend.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <a
                      href={friend.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      访问网站
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Apply Section */}
        {/* <Card className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">申请友链</h2>
              <p className="text-muted-foreground mb-6">
                如果你也是技术博主，并且认同技术分享的价值，欢迎与我交换友链！
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">申请条件</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-left">
                      {applicationInfo.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">我的信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-left text-sm">
                      <div><strong>网站名称：</strong>Bi Blog</div>
                      <div><strong>网站描述：</strong>分享技术见解，记录成长历程</div>
                      <div><strong>网站地址：</strong>https://your-blog-url.com</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button size="lg" asChild>
                <a href="mailto:contact@example.com?subject=友链申请">
                  <Mail className="h-4 w-4 mr-2" />
                  发送邮件申请
                </a>
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}