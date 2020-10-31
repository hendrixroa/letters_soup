# Letters Soup

## Background
This project is the implementation of this [Exercise](./exercise/Test-Back-Node.pdf)

### Dependencies

- Node.js 14.+
- Yarn
- make or equivalent
- GCC and g++

### How to run

1. Go to the root folder, run `yarn` (equivalent to `npm install`).
1. Inside `src/apps/` there is an app named `finder` where you can load your sample data (explanation next point), if you want to run the app *finder* just type `APP=finder make dev_app`.
1. In the folder `./data` there is all sample input files, please follow those examples, this project will validate the input and show you an error if the file has not the right format. In the file `./src/apps/finder/main.ts` (Line 20) there is the example manner to load the dummy data from folder data, you can do it something like that: 

```typescript
const dataCase1 = parseToInputStruct('yourCase.txt');
const countCase1 = soupService.countOIEWord(dataCase1);
console.log(countCase1);
```

### Testing

Just run `yarn run test` to run all tests inside `./test` folder, similar way like *finder* app you can add your tests following of dummy data on `./data` folder.

#### Frameworks and language used

- [Nest.js](https://docs.nestjs.com)
- Typescript
- Node.js 
