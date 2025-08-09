use('shm-chat');

db.getCollection('messages').aggregate([
  {
    $match: {
      body: { $regex: 'паровоз', $options: 'i' }
    }
  },
  {
    $project: {
      count: {
        $size: {
          $regexFindAll: {
            input: "$body",
            regex: /паровоз/i
          }
        }
      }
    }
  },
  {

    $group: {
      _id: null,
      totalCount: { $sum: "$count" }
    }
  }
]);