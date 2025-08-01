import { Github, Twitter, Mail, MapPin } from 'lucide-react'
import { getAboutData } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  const aboutData = getAboutData()
  const { profile, contact } = aboutData

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Avatar className="w-32 h-32 mx-auto mb-6 shadow-lg">
            <AvatarImage src="/avatar.jpg" alt={profile.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-4xl font-bold text-white">
              {profile.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">关于我</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {profile.bio}
          </p>
        </div>

        <div className="space-y-8">
          <Card className="shadow-md">
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {profile.description}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">联系方式</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{profile.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="h-5 w-5 text-muted-foreground" />
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-muted-foreground" />
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <a href={contact.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}