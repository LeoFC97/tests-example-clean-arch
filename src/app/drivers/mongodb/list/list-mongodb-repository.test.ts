// test/post.test.ts
import ListMongoDBRepository from '../list/list-mongodb-repository';
import container from '../../../container';
import { clear, close, connect } from '../../../../config/setup-database-for-tests';
import { List } from 'app/interfaces/entities/list/list';
import ListSchema  from '../list/list-schema';
import { CreateListDataMock, listThatWasCreatedMock } from '../../../../test/mocks/list'
import mongoose from 'mongoose';

let listMongoDBRepository = container.resolve(ListMongoDBRepository);
beforeAll(async () => {
    await connect()
});

afterEach(async () => {
    await clear()
});

afterAll(async () => {
    await close()
});

describe('List test', () => {
    it('Object returned from repository method should have correct fields', async () => {
        const returnOfRepositoryMethod = await listMongoDBRepository.create(CreateListDataMock);
        expect(returnOfRepositoryMethod._id).toBeDefined();
        expect(returnOfRepositoryMethod.createdAt).toBeDefined();
        expect(returnOfRepositoryMethod.deleatedAt).toBeUndefined();
        expect(returnOfRepositoryMethod.description).toStrictEqual(CreateListDataMock.description);
        expect(returnOfRepositoryMethod.title).toStrictEqual(CreateListDataMock.title);
    });
    it('Document should be created with correct fields', async () => {
        await listMongoDBRepository.create(CreateListDataMock);
        const listFoundInDatabase:List[] = await mongoose.model('List', ListSchema).find().exec();
        expect(listFoundInDatabase[0].description).toBe(CreateListDataMock.description)
        expect(listFoundInDatabase[0].createdBy).toBe(CreateListDataMock.createdBy)
        expect(listFoundInDatabase[0].title).toBe(CreateListDataMock.title)
    });
    it('Should only have 1 document at database', async () => {
        await listMongoDBRepository.create(CreateListDataMock);
        const listFoundInDatabase:List[] = await mongoose.model('List', ListSchema).find().exec();
        expect(listFoundInDatabase.length).toBe(1)
    });
    it('Should return a document', async () => {
        await mongoose.model('List', ListSchema).create(CreateListDataMock);
        const listFoundInDatabase:List | null = await listMongoDBRepository.getByUserId(CreateListDataMock.createdBy);
        expect(listFoundInDatabase).not.toBeNull()
        expect(listFoundInDatabase?.createdBy).toStrictEqual(CreateListDataMock.createdBy)
    });
    it('Should return null when not found any document for the passed id', async () => {
        const listFoundInDatabase:List | null = await listMongoDBRepository.getByUserId(CreateListDataMock.createdBy);
        expect(listFoundInDatabase).toBeNull()
    });
});

