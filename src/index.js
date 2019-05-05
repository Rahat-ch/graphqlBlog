import { GraphQLServer } from 'graphql-yoga'

//demo user data
const users = [{
    id:'1',
    name: 'Rahat',
    email:'rahat@example.com',
    age: 28,
}, {
    id:"2",
    name: "Jaan",
    email:"jaan@jaan.com",
}, {
    id:"3",
    name: "Kid",
    email: "kid@kid.com",
    age: 0,
}]

const posts = [{
    id:'1',
    title:'I am dev',
    body: 'I am super cool dev',
    published: true
}, {
    id: "2",
    title:'I am pm',
    body:'I am super cool pm yo',
    published: true
}, {
    id:"3",
    title:'Goo goo gaa gaa',
    body:"googly gaaaa",
    published: false
}]

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String
        published: Boolean!
    }
`

const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query){
                return users
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        me(){
            return {
                id: '123',
                name: 'Mike',
                email: 'shinoda@lp.com',
                
            }
        },
        posts(parent, args, ctx, info){
            if(!args.query){
                return posts
            }
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log(`🚀 blasting off to 4000`)
})