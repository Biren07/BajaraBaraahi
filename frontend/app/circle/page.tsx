// "use client"

// import { useState } from "react"
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Users,
//   BookOpen,
//   Crown,
//   Star,
//   Calendar,
//   MessageCircle,
//   Gift,
//   Trophy,
//   Sparkles,
//   Check,
//   ArrowRight,
//   Heart,
//   Share2,
//   Bell,
//   Zap
// } from "lucide-react"

// const bookClubs = [
//   {
//     id: 1,
//     name: "Fiction Fanatics",
//     members: 2450,
//     currentBook: "The Midnight Library",
//     author: "Matt Haig",
//     description: "For lovers of contemporary fiction and literary masterpieces",
//     nextMeeting: "March 25, 2024",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//     tags: ["Fiction", "Literary", "Contemporary"]
//   },
//   {
//     id: 2,
//     name: "Sci-Fi Explorers",
//     members: 1890,
//     currentBook: "Project Hail Mary",
//     author: "Andy Weir",
//     description: "Exploring the cosmos through science fiction literature",
//     nextMeeting: "March 28, 2024",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
//     tags: ["Sci-Fi", "Space", "Adventure"]
//   },
//   {
//     id: 3,
//     name: "Business Minds",
//     members: 3200,
//     currentBook: "Psychology of Money",
//     author: "Morgan Housel",
//     description: "Level up your business acumen with strategic reads",
//     nextMeeting: "March 22, 2024",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
//     tags: ["Business", "Finance", "Self-Help"]
//   },
//   {
//     id: 4,
//     name: "Mystery Solvers",
//     members: 1567,
//     currentBook: "The Silent Patient",
//     author: "Alex Michaelides",
//     description: "Unravel mysteries and discuss plot twists together",
//     nextMeeting: "March 30, 2024",
//     image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
//     tags: ["Mystery", "Thriller", "Suspense"]
//   },
// ]

// const upcomingEvents = [
//   {
//     title: "Author Meet: Matt Haig",
//     date: "April 5, 2024",
//     time: "6:00 PM",
//     type: "Virtual",
//     attendees: 450,
//   },
//   {
//     title: "Spring Reading Challenge",
//     date: "April 1-30, 2024",
//     time: "All Month",
//     type: "Challenge",
//     attendees: 1200,
//   },
//   {
//     title: "Book Swap Event",
//     date: "April 15, 2024",
//     time: "2:00 PM",
//     type: "In-Person",
//     attendees: 85,
//   },
// ]

// const membershipTiers = [
//   {
//     name: "Reader",
//     price: "Free",
//     period: "",
//     features: [
//       "Join 3 book clubs",
//       "Basic reading challenges",
//       "Community forums access",
//       "Monthly newsletter",
//     ],
//     popular: false,
//   },
//   {
//     name: "Bibliophile",
//     price: "$9.99",
//     period: "/month",
//     features: [
//       "Unlimited book clubs",
//       "Exclusive reading challenges",
//       "Author meet & greets",
//       "10% discount on all books",
//       "Early access to new releases",
//       "Premium badges & rewards",
//     ],
//     popular: true,
//   },
//   {
//     name: "Literary Elite",
//     price: "$24.99",
//     period: "/month",
//     features: [
//       "Everything in Bibliophile",
//       "Free monthly book selection",
//       "20% discount on all books",
//       "Priority customer support",
//       "Exclusive limited editions",
//       "Personal book concierge",
//     ],
//     popular: false,
//   },
// ]

// const leaderboard = [
//   { rank: 1, name: "Sarah M.", books: 47, points: 4750, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face" },
//   { rank: 2, name: "James L.", books: 42, points: 4200, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" },
//   { rank: 3, name: "Emma K.", books: 38, points: 3800, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" },
//   { rank: 4, name: "Michael R.", books: 35, points: 3500, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" },
//   { rank: 5, name: "Lisa T.", books: 33, points: 3300, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face" },
// ]

// export default function CirclePage() {
//   const [joinedClubs, setJoinedClubs] = useState<number[]>([1])

//   const toggleJoinClub = (clubId: number) => {
//     setJoinedClubs(prev =>
//       prev.includes(clubId)
//         ? prev.filter(id => id !== clubId)
//         : [...prev, clubId]
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="pt-32 pb-16">
//         {/* Hero Section */}
//         <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 mb-12">
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full animate-pulse" />
//             <div className="absolute bottom-20 right-20 w-48 h-48 border border-gold rounded-full animate-pulse delay-300" />
//             <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-gold rounded-full animate-pulse delay-500" />
//           </div>

//           <div className="container mx-auto px-4 relative">
//             <div className="max-w-3xl mx-auto text-center">
//               <Badge className="bg-gold text-primary-foreground mb-4">
//                 <Sparkles className="w-3 h-3 mr-1" />
//                 Join Our Community
//               </Badge>
//               <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-4">
//                 Welcome to <span className="text-gold">BajarBook Circle</span>
//               </h1>
//               <p className="text-lg text-primary-foreground/80 mb-8">
//                 Connect with fellow book lovers, join exclusive reading clubs, participate in challenges, and earn rewards for your reading journey.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button size="lg" className="bg-gold text-primary-foreground hover:bg-gold-dark">
//                   <Crown className="w-5 h-5 mr-2" />
//                   Upgrade to Premium
//                 </Button>
//                 <Button size="lg" variant="outline" className="border-gold/50 text-primary-foreground hover:bg-gold/10">
//                   <Users className="w-5 h-5 mr-2" />
//                   Browse Clubs
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="container mx-auto px-4">
//           {/* Stats Banner */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
//             <Card className="border-gold/20 text-center py-6 hover:border-gold/40 transition-colors">
//               <CardContent className="p-0">
//                 <Users className="w-8 h-8 text-gold mx-auto mb-2" />
//                 <p className="text-3xl font-bold">15K+</p>
//                 <p className="text-sm text-muted-foreground">Active Members</p>
//               </CardContent>
//             </Card>
//             <Card className="border-gold/20 text-center py-6 hover:border-gold/40 transition-colors">
//               <CardContent className="p-0">
//                 <BookOpen className="w-8 h-8 text-gold mx-auto mb-2" />
//                 <p className="text-3xl font-bold">50+</p>
//                 <p className="text-sm text-muted-foreground">Book Clubs</p>
//               </CardContent>
//             </Card>
//             <Card className="border-gold/20 text-center py-6 hover:border-gold/40 transition-colors">
//               <CardContent className="p-0">
//                 <MessageCircle className="w-8 h-8 text-gold mx-auto mb-2" />
//                 <p className="text-3xl font-bold">100K+</p>
//                 <p className="text-sm text-muted-foreground">Discussions</p>
//               </CardContent>
//             </Card>
//             <Card className="border-gold/20 text-center py-6 hover:border-gold/40 transition-colors">
//               <CardContent className="p-0">
//                 <Trophy className="w-8 h-8 text-gold mx-auto mb-2" />
//                 <p className="text-3xl font-bold">25+</p>
//                 <p className="text-sm text-muted-foreground">Challenges</p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Main Content Tabs */}
//           <Tabs defaultValue="clubs" className="w-full">
//             <TabsList className="w-full justify-start bg-muted/50 p-1 mb-8 flex-wrap h-auto gap-1">
//               <TabsTrigger value="clubs" className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground">
//                 <Users className="w-4 h-4 mr-2" />
//                 Book Clubs
//               </TabsTrigger>
//               <TabsTrigger value="events" className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 Events
//               </TabsTrigger>
//               <TabsTrigger value="leaderboard" className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground">
//                 <Trophy className="w-4 h-4 mr-2" />
//                 Leaderboard
//               </TabsTrigger>
//               <TabsTrigger value="membership" className="data-[state=active]:bg-gold data-[state=active]:text-primary-foreground">
//                 <Crown className="w-4 h-4 mr-2" />
//                 Membership
//               </TabsTrigger>
//             </TabsList>

//             {/* Book Clubs Tab */}
//             <TabsContent value="clubs">
//               <div className="grid md:grid-cols-2 gap-6">
//                 {bookClubs.map((club) => (
//                   <Card key={club.id} className="border-gold/20 overflow-hidden hover:shadow-xl transition-all group">
//                     <CardContent className="p-6">
//                       <div className="flex items-start gap-4">
//                         <div className="relative">
//                           <img
//                             src={club.image}
//                             alt={club.name}
//                             className="w-16 h-16 rounded-full object-cover border-2 border-gold"
//                           />
//                           <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gold rounded-full flex items-center justify-center">
//                             <Users className="w-3 h-3 text-primary-foreground" />
//                           </div>
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-start justify-between">
//                             <div>
//                               <h3 className="font-semibold text-lg group-hover:text-gold transition-colors">{club.name}</h3>
//                               <p className="text-sm text-muted-foreground">{club.members.toLocaleString()} members</p>
//                             </div>
//                             <Button
//                               size="sm"
//                               variant={joinedClubs.includes(club.id) ? "default" : "outline"}
//                               className={joinedClubs.includes(club.id)
//                                 ? "bg-gold text-primary-foreground hover:bg-gold-dark"
//                                 : "border-gold/30 hover:bg-gold/10 hover:text-gold"
//                               }
//                               onClick={() => toggleJoinClub(club.id)}
//                             >
//                               {joinedClubs.includes(club.id) ? (
//                                 <>
//                                   <Check className="w-4 h-4 mr-1" />
//                                   Joined
//                                 </>
//                               ) : "Join"}
//                             </Button>
//                           </div>
//                           <p className="text-sm text-muted-foreground mt-2">{club.description}</p>

//                           <div className="flex flex-wrap gap-1 mt-3">
//                             {club.tags.map((tag) => (
//                               <Badge key={tag} variant="outline" className="text-xs border-gold/30">
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="mt-4 pt-4 border-t border-border">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <p className="text-xs text-muted-foreground">Currently Reading</p>
//                             <p className="font-medium">{club.currentBook}</p>
//                             <p className="text-sm text-muted-foreground">by {club.author}</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-xs text-muted-foreground">Next Meeting</p>
//                             <p className="text-sm font-medium text-gold">{club.nextMeeting}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               <div className="mt-8 text-center">
//                 <Button variant="outline" size="lg" className="border-gold/30 hover:bg-gold/10 hover:text-gold">
//                   View All Book Clubs
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </div>
//             </TabsContent>

//             {/* Events Tab */}
//             <TabsContent value="events">
//               <div className="grid md:grid-cols-3 gap-6">
//                 {upcomingEvents.map((event, idx) => (
//                   <Card key={idx} className="border-gold/20 overflow-hidden hover:shadow-lg transition-shadow">
//                     <CardHeader className="bg-gradient-to-r from-gold/10 to-gold/5 pb-4">
//                       <Badge className={
//                         event.type === "Virtual"
//                           ? "bg-blue-500/10 text-blue-600 border-blue-500/20 w-fit"
//                           : event.type === "Challenge"
//                           ? "bg-gold/10 text-gold border-gold/20 w-fit"
//                           : "bg-green-500/10 text-green-600 border-green-500/20 w-fit"
//                       }>
//                         {event.type}
//                       </Badge>
//                       <CardTitle className="text-xl">{event.title}</CardTitle>
//                     </CardHeader>
//                     <CardContent className="pt-4">
//                       <div className="space-y-3">
//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <Calendar className="w-4 h-4" />
//                           <span>{event.date}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <Zap className="w-4 h-4" />
//                           <span>{event.time}</span>
//                         </div>
//                         <div className="flex items-center gap-2 text-muted-foreground">
//                           <Users className="w-4 h-4" />
//                           <span>{event.attendees} attending</span>
//                         </div>
//                       </div>
//                       <div className="flex gap-2 mt-4">
//                         <Button className="flex-1 bg-gold text-primary-foreground hover:bg-gold-dark">
//                           <Bell className="w-4 h-4 mr-2" />
//                           RSVP
//                         </Button>
//                         <Button variant="outline" size="icon" className="border-gold/30 hover:bg-gold/10">
//                           <Share2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </TabsContent>

//             {/* Leaderboard Tab */}
//             <TabsContent value="leaderboard">
//               <div className="grid md:grid-cols-3 gap-6">
//                 {/* Top 3 Podium */}
//                 <Card className="md:col-span-2 border-gold/20">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Trophy className="w-5 h-5 text-gold" />
//                       Top Readers This Month
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="flex items-end justify-center gap-4 mb-8">
//                       {/* 2nd Place */}
//                       <div className="text-center">
//                         <div className="relative mb-2">
//                           <img src={leaderboard[1].avatar} alt={leaderboard[1].name} className="w-16 h-16 rounded-full border-2 border-gray-400 mx-auto" />
//                           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                             2
//                           </div>
//                         </div>
//                         <div className="h-24 w-20 bg-gray-400/20 rounded-t-lg flex items-center justify-center">
//                           <div className="text-center">
//                             <p className="font-semibold text-sm">{leaderboard[1].name}</p>
//                             <p className="text-xs text-muted-foreground">{leaderboard[1].points} pts</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* 1st Place */}
//                       <div className="text-center">
//                         <div className="relative mb-2">
//                           <Crown className="w-6 h-6 text-gold absolute -top-4 left-1/2 -translate-x-1/2" />
//                           <img src={leaderboard[0].avatar} alt={leaderboard[0].name} className="w-20 h-20 rounded-full border-4 border-gold mx-auto" />
//                           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-primary-foreground font-bold">
//                             1
//                           </div>
//                         </div>
//                         <div className="h-32 w-24 bg-gold/20 rounded-t-lg flex items-center justify-center">
//                           <div className="text-center">
//                             <p className="font-bold">{leaderboard[0].name}</p>
//                             <p className="text-sm text-gold font-semibold">{leaderboard[0].points} pts</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* 3rd Place */}
//                       <div className="text-center">
//                         <div className="relative mb-2">
//                           <img src={leaderboard[2].avatar} alt={leaderboard[2].name} className="w-14 h-14 rounded-full border-2 border-amber-600 mx-auto" />
//                           <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
//                             3
//                           </div>
//                         </div>
//                         <div className="h-16 w-18 bg-amber-600/20 rounded-t-lg flex items-center justify-center px-2">
//                           <div className="text-center">
//                             <p className="font-semibold text-sm">{leaderboard[2].name}</p>
//                             <p className="text-xs text-muted-foreground">{leaderboard[2].points} pts</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Full Leaderboard */}
//                     <div className="space-y-2">
//                       {leaderboard.map((user) => (
//                         <div key={user.rank} className={`flex items-center gap-4 p-3 rounded-lg ${user.rank <= 3 ? "bg-gold/10" : "bg-muted/30"}`}>
//                           <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
//                             user.rank === 1 ? "bg-gold text-primary-foreground" :
//                             user.rank === 2 ? "bg-gray-400 text-white" :
//                             user.rank === 3 ? "bg-amber-600 text-white" :
//                             "bg-muted text-muted-foreground"
//                           }`}>
//                             {user.rank}
//                           </span>
//                           <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
//                           <div className="flex-1">
//                             <p className="font-medium">{user.name}</p>
//                             <p className="text-sm text-muted-foreground">{user.books} books read</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-bold text-gold">{user.points}</p>
//                             <p className="text-xs text-muted-foreground">points</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Your Stats */}
//                 <Card className="border-gold/20">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Star className="w-5 h-5 text-gold" />
//                       Your Progress
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div className="text-center p-4 bg-muted/30 rounded-lg">
//                       <p className="text-4xl font-bold text-gold">#47</p>
//                       <p className="text-muted-foreground">Your Rank</p>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground">Books Read</span>
//                         <span className="font-semibold">12</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground">Points Earned</span>
//                         <span className="font-semibold text-gold">1,200</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground">Challenges Completed</span>
//                         <span className="font-semibold">3</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground">Reviews Written</span>
//                         <span className="font-semibold">8</span>
//                       </div>
//                     </div>
//                     <Button className="w-full bg-gold text-primary-foreground hover:bg-gold-dark">
//                       <Gift className="w-4 h-4 mr-2" />
//                       Redeem Rewards
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             {/* Membership Tab */}
//             <TabsContent value="membership">
//               <div className="grid md:grid-cols-3 gap-6">
//                 {membershipTiers.map((tier) => (
//                   <Card
//                     key={tier.name}
//                     className={`border-gold/20 relative overflow-hidden ${tier.popular ? "ring-2 ring-gold shadow-xl" : ""}`}
//                   >
//                     {tier.popular && (
//                       <div className="absolute top-4 right-4">
//                         <Badge className="bg-gold text-primary-foreground">
//                           <Star className="w-3 h-3 mr-1" />
//                           Most Popular
//                         </Badge>
//                       </div>
//                     )}
//                     <CardHeader className={tier.popular ? "bg-gradient-to-r from-gold/10 to-gold/5" : ""}>
//                       <CardTitle className="text-2xl">{tier.name}</CardTitle>
//                       <CardDescription>
//                         <span className="text-3xl font-bold text-foreground">{tier.price}</span>
//                         <span className="text-muted-foreground">{tier.period}</span>
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <ul className="space-y-3 mb-6">
//                         {tier.features.map((feature, idx) => (
//                           <li key={idx} className="flex items-start gap-2">
//                             <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
//                             <span>{feature}</span>
//                           </li>
//                         ))}
//                       </ul>
//                       <Button
//                         className={`w-full ${tier.popular
//                           ? "bg-gold text-primary-foreground hover:bg-gold-dark"
//                           : "border-gold/30 hover:bg-gold/10 hover:text-gold"
//                         }`}
//                         variant={tier.popular ? "default" : "outline"}
//                       >
//                         {tier.price === "Free" ? "Current Plan" : "Upgrade Now"}
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* FAQ */}
//               <Card className="mt-8 border-gold/20">
//                 <CardHeader>
//                   <CardTitle>Membership Benefits FAQ</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <h4 className="font-semibold mb-2">How do I earn points?</h4>
//                       <p className="text-muted-foreground text-sm">Earn points by reading books, writing reviews, participating in discussions, completing challenges, and attending events.</p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">What can I redeem points for?</h4>
//                       <p className="text-muted-foreground text-sm">Redeem points for book discounts, free shipping, exclusive merchandise, and limited edition books.</p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">Can I cancel my membership?</h4>
//                       <p className="text-muted-foreground text-sm">Yes, you can cancel anytime. Your benefits will remain active until the end of your billing period.</p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">How do book clubs work?</h4>
//                       <p className="text-muted-foreground text-sm">Join clubs that match your interests, participate in monthly reads, and join virtual or in-person discussions.</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }

import DeploymentPage from "@/components/deployment";
import React from "react";

const CirclePage = () => {
  return (
    <div>
      <DeploymentPage />
    </div>
  );
};

export default CirclePage;
