import { Test, TestingModule } from '@nestjs/testing';
import { JsonDataSource } from '@app/shared/infrastructure/persistence/json/data-source';
import { findAllQuery } from '@app/movies/domain/interfaces';

import { MoviesJsonRepository } from '../../src/movies/infrastrusture/persistence/movies.json.repository';

describe('MoviesJsonRepository', () => {
  let repository: MoviesJsonRepository;

  // Mock de JsonDataSource
  const jsonDataSourceMock = {
    getData: jest.fn().mockResolvedValue([]), // Definir la función getData
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesJsonRepository,
        { provide: JsonDataSource, useValue: jsonDataSourceMock },
      ],
    }).compile();

    repository = module.get<MoviesJsonRepository>(MoviesJsonRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all movies', async () => {
      const paginatedQuery: findAllQuery = {
        categorizeBy: 'default',
        take: 10,
        page: 0,
        order: 'ASC'
      };

      const result = await repository.findAll(paginatedQuery);

      expect(jsonDataSourceMock.getData).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('findByActor', () => {
    it('should return all movies where actor is in cast', async () => {
      const paginatedQuery: findAllQuery = {
        categorizeBy: 'actor',
        actor: 'Sam Taylor',
        take: 10,
        page: 0,
        order: 'ASC'
      };

      const result = await repository.findAll(paginatedQuery);

      expect(jsonDataSourceMock.getData).toHaveBeenCalled(); 
      expect(result).toEqual([]);
    });
  });

});
