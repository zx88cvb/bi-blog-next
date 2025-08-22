import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'content/data')

export interface AboutData {
  profile: {
    name: string
    title: string
    location: string
    email: string
    avatar: string
    bio: string
    description: string
  }
  contact: {
    github: string
    twitter: string
    linkedin: string
    email: string
  }
}

export interface MilestoneData {
  milestones: Array<{
    id: string
    date: string
    title: string
    description: string
    type: string
    icon: string
    details: string[]
  }>
  statistics: {
    totalMilestones: number
    projectsCompleted: number
    learningGoals: number
    careerMilestones: number
    contributions: number
    presentations: number
  }
  categories: Array<{
    type: string
    name: string
    color: string
    description: string
  }>
}

export interface FriendsData {
  friends: Array<{
    id: string
    name: string
    url: string
    description: string
    avatar: string
    status: string
    tags: string[]
    addedDate: string
  }>
  categories: Array<{
    id: string
    name: string
    count: number
    color: string
  }>
  statistics: {
    totalFriends: number
    activeFriends: number
    inactiveFriends: number
    categories: number
  }
  settings: {
    displayMode: string
    sortBy: string
    showStatus: boolean
    showTags: boolean
    showDescription: boolean
  }
  applicationInfo: {
    title: string
    description: string
    requirements: string[]
    applicationMethod: string
    responseTime: string
  }
}

export function getAboutData(): AboutData {
  try {
    const fullPath = path.join(dataDirectory, 'about.json')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading about data:', error)
    throw new Error('Failed to load about data')
  }
}

export function getMilestonesData(): MilestoneData {
  try {
    const fullPath = path.join(dataDirectory, 'milestones.json')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const data = JSON.parse(fileContents)
    
    // 按照日期倒序排列里程碑数据
    data.milestones.sort((a: { date: string }, b: { date: string }) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    
    return data
  } catch (error) {
    console.error('Error reading milestones data:', error)
    throw new Error('Failed to load milestones data')
  }
}

export function getFriendsData(): FriendsData {
  try {
    const fullPath = path.join(dataDirectory, 'friends.json')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading friends data:', error)
    throw new Error('Failed to load friends data')
  }
}