import { jest } from "@jest/globals"
import { prisma } from "../lib/dbConnect.js"

const mockFindFirst = jest.fn()
const mockCreate = jest.fn()

jest.mock("../lib/dbConnect.js", () => ({
    prisma: {
        user: {
            findFirst: mockFindFirst,
            create: mockCreate,
        },
        account: {
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn()
        }
    }
}))

jest.mock("passport", () => ({
    use: jest.fn().mockImplementation((req, res, next) => next()),
    initialize: jest.fn().mockImplementation((req, res, next) => next()),
    authorize: jest.fn().mockImplementation((req, res, next) => next())
}))

let mockVerifyCallback = async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value
    const user = await mockFindFirst({ where: { email }, include: { accounts: true } })
    if (!user) {
        const newUser = await mockCreate({
            data: {
                email,
                accounts: {
                    create: {
                        provider: "GOOGLE",
                        providerId: profile.id
                    }
                }
            },
            include: { accounts: true }
        })

        return done(null, newUser)
    }

    return done(null, user)
}

beforeEach(() => {
    jest.clearAllMocks()
})

const mockDone = jest.fn()

const mockGoogleProfile = {
    id: "googleid123",
    emails: [{ value: "testemail@gmail.com" }]
}

test("Should create a user if email does not exist", async () => {
    mockFindFirst.mockResolvedValue(null)

    const createdUser = {
        id: "googleid123",
        email: "testemail@gmail.com",
        accounts: []
    }

    mockCreate.mockResolvedValue(createdUser)

    await mockVerifyCallback("access", "refresh", mockGoogleProfile, mockDone)



    expect(mockCreate).toHaveBeenCalledWith({
        data: {
            email: "testemail@gmail.com",
            accounts: {
                create: {
                    provider: "GOOGLE",
                    providerId: "googleid123",
                }
            }
        },
        include: { accounts: true }
    })

    expect(mockDone).toHaveBeenCalledWith(null, createdUser)

}, 10000)
