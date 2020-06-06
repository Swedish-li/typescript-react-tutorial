import todos, { TodoAction } from "./todos";
import * as types from '../constants/ActionTypes'

describe('todo reducer', () => {
    it('should handle initial state', () => {
        const action = {} as TodoAction;
        expect(todos(undefined, action)).toEqual(
            [{
                text: 'Use Redux',
                completed: false,
                id: 0
            }]
        )
    })

    it('should handle ADD_TODO', () => {
        expect(todos([],
            { type: types.ADD_TODO, text: 'test todo' }
        ))
            .toEqual([
                {
                    id: 0,
                    text: 'test todo',
                    completed: false
                }
            ])

        expect(
            todos(
                [
                    {
                        text: 'Use Redux',
                        completed: false,
                        id: 0
                    }
                ], {
                type: types.ADD_TODO,
                text: 'add test1 todo'
            }
            )
        ).toEqual([

            {
                text: 'Use Redux',
                completed: false,
                id: 0
            },
            {
                text: 'add test1 todo',
                id: 1,
                completed: false
            }
        ])

        expect(todos([
            {
                text: 'Use Redux',
                completed: false,
                id: 0
            },
            {
                text: 'add test1 todo',
                id: 1,
                completed: false
            }
        ], {
            type: types.ADD_TODO,
            text: 'add test2 todo'
        })).toEqual([
            {
                text: 'Use Redux',
                completed: false,
                id: 0
            },
            {
                text: 'add test1 todo',
                id: 1,
                completed: false
            }, {
                text: 'add test2 todo',
                id: 2,
                completed: false
            }
        ])
    })

    it('should handle DELETE_TODO', () => {
        expect(todos(
            [
                {
                    text: 'Use Redux',
                    completed: false,
                    id: 0
                },
                {
                    text: 'add test1 todo',
                    id: 1,
                    completed: false
                }
            ], {
            type: types.DELETE_TODO,
            id: 1
        }
        )).toEqual([
            {
                text: 'Use Redux',
                completed: false,
                id: 0
            },
        ])
    })

    it('should handle EDIT_TODO', () => {
        expect(
            todos([
                {
                    text: 'Run the tests',
                    completed: false,
                    id: 1
                }, {
                    text: 'Use Redux',
                    completed: false,
                    id: 0
                }
            ], {
                type: types.EDIT_TODO,
                text: 'Fix the tests',
                id: 1
            })
        ).toEqual([
            {
                text: 'Fix the tests',
                completed: false,
                id: 1
            }, {
                text: 'Use Redux',
                completed: false,
                id: 0
            }
        ])
    })

    it('should handle COMPLETE_TODO', () => {
        expect(
            todos([
                {
                    text: 'Run the tests',
                    completed: false,
                    id: 1
                }, {
                    text: 'Use Redux',
                    completed: false,
                    id: 0
                }
            ], {
                type: types.COMPLETE_TODO,
                id: 1
            })
        ).toEqual([
            {
                text: 'Run the tests',
                completed: true,
                id: 1
            }, {
                text: 'Use Redux',
                completed: false,
                id: 0
            }
        ])
    })

    it('should handle COMPLETE_ALL_TODOS', () => {
        expect(
            todos([
                {
                    text: 'Run the tests',
                    completed: true,
                    id: 1
                }, {
                    text: 'Use Redux',
                    completed: false,
                    id: 0
                }
            ], {
                type: types.COMPLETE_ALL_TODOS
            })
        ).toEqual([
            {
                text: 'Run the tests',
                completed: true,
                id: 1
            }, {
                text: 'Use Redux',
                completed: true,
                id: 0
            }
        ])

        // Unmark if all todos are currently completed
        expect(
            todos([
                {
                    text: 'Run the tests',
                    completed: true,
                    id: 1
                }, {
                    text: 'Use Redux',
                    completed: true,
                    id: 0
                }
            ], {
                type: types.COMPLETE_ALL_TODOS
            })
        ).toEqual([
            {
                text: 'Run the tests',
                completed: false,
                id: 1
            }, {
                text: 'Use Redux',
                completed: false,
                id: 0
            }
        ])
    })

    it('should handle CLEAR_COMPLETED', () => {
        expect(
            todos([
                {
                    text: 'Run the tests',
                    completed: true,
                    id: 1
                }, {
                    text: 'Use Redux',
                    completed: false,
                    id: 0
                }
            ], {
                type: types.CLEAR_COMPLETED
            })
        ).toEqual([
            {
                text: 'Use Redux',
                completed: false,
                id: 0
            }
        ])
    })

    it('should not generate duplicate ids after CLEAR_COMPLETED', () => {
        const actionArr: TodoAction[] = [

            {
                type: types.COMPLETE_TODO,
                id: 0
            }, {
                type: types.CLEAR_COMPLETED
            }, {
                type: types.ADD_TODO,
                text: 'Write more tests'
            }
        ];

        expect(
            actionArr.reduce(todos, [
                {
                    id: 0,
                    completed: false,
                    text: 'Use Redux'
                }, {
                    id: 1,
                    completed: false,
                    text: 'Write tests'
                }
            ])
        ).toEqual([
            {
                text: 'Write tests',
                completed: false,
                id: 1
            }, {
                text: 'Write more tests',
                completed: false,
                id: 2
            }
        ])
    })
})