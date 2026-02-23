# Mongo Tips

Helpful for refreshing Mongoose concepts for Savorly back-end work.

### One-to-Many

An example where each school has many students and no student goes to multiple schools:

```typescript
const schoolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
```

```typescript
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },
  { timestamps: true },
);
```

### Number of objects within one-to-many

Use `countDocuments`:

```typescript
const studentCount = await Student.countDocuments({ school: schoolId });
```

### Transactions

Helpful if a list of queries need to be performed atomically:

```typescript
const session = await mongoose.startSession();

try {
  await session.withTransaction(async () => {
    // code block of operations here
  });

  console.log("Transaction committed");
} catch (err) {
  console.error("Transaction aborted:", err);
} finally {
  session.endSession();
}
```

### Average Across Table

```typescript
const result = await Student.aggregate([
  { $match: { name: "John" } },
  {
    $group: {
      _id: null,
      averageAge: { $avg: "$age" },
    },
  },
]);

console.log(result[0]?.averageAge);
```
