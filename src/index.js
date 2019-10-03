const { GraphQLServer } = require('graphql-yoga');

let links = [{ id: 'link-0', url: 'www.google.com', description: 'google' }];
let idCount = links.length;
// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (id1, id2) => {
      for (let i = 0; i < links.length; i++) {
        console.log(id2);
        if (links[i].id == id2.id) return links[i];
      }
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: (idCount++).toString(),
        description: args.description,
        url: args.url,
      };
      links.push(link);
      console.log(links);
      return link;
    },
    updateLink: (parent, args) => {
      let updatedLink = {};
      links = links.map(link => {
        if (link.id == args.id) {
          updatedLink = { ...link, ...args };
          return updatedLink;
        } else return link;
      });
      console.log(links);
      console.log(updatedLink);
      return updatedLink;
    },
    deleteLink: (parent, id) => {
      let deletedLink = {};
      console.log(id);
      links = links.filter(link => {
        if (link.id === id.id) {
          deletedLink = link;
          console.log('deleted ', deletedLink);
        } else {
          return link;
        }
      });
      return deletedLink;
    },
  },
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
