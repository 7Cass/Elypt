import swagger from "@elysiajs/swagger";
import CreateTransactionController from "./adapters/transaction/CreateTransactionController";
import AuthenticateUserController from "./adapters/user/AuthenticateUserController";
import CreateUserController from "./adapters/user/CreateUserController";
import FindUserByIdController from "./adapters/user/FindUserByIdController";
import CreateWalletController from "./adapters/wallet/CreateWalletController";
import GetWalletController from "./adapters/wallet/GetWalletController";
import CreateTransaction from "./core/transaction/service/CreateTransaction";
import AuthenticateUser from "./core/user/service/AuthenticateUser";
import CreateUser from "./core/user/service/CreateUser";
import FindUserById from "./core/user/service/FindUserById";
import CreateWallet from "./core/wallet/service/CreateWallet";
import GetWalletByUserId from "./core/wallet/service/GetWalletByUserId";
import app from "./external/api/config";
import TransactionRepositoryPrismaPg from "./external/prisma/TransactionRepositoryPrismaPg";
import UserRepositoryPrismaPg from "./external/prisma/UserRepositoryPrismaPg";
import WalletRepositoryPrismaPg from "./external/prisma/WalletRepositoryPrismaPg";
import FindAllTransactionsByWalletId from "./core/transaction/service/FindAllTransactionsByWalletId";
import FindAllTransactionsByWalletIdController from "./adapters/transaction/FindAllTransactionsByWalletIdController";

// Repository Instance -- External layer
const userRepository = new UserRepositoryPrismaPg();
const walletRepository = new WalletRepositoryPrismaPg();
const transactionRepository = new TransactionRepositoryPrismaPg();

// Services Instance -- Core layer
const createUser = new CreateUser(userRepository);
const createWallet = new CreateWallet(walletRepository, userRepository, transactionRepository);
const createTransaction = new CreateTransaction(transactionRepository, walletRepository);
const getWalletByUserId = new GetWalletByUserId(walletRepository);
const findUserById = new FindUserById(userRepository);
const authenticateUser = new AuthenticateUser(userRepository);
const findAllTransactionsByWalletId = new FindAllTransactionsByWalletId(transactionRepository, walletRepository);

// Controllers Instance -- Adapters layer
new CreateUserController(app, createUser);
new AuthenticateUserController(app, authenticateUser);

new CreateWalletController(app, createWallet);
new CreateTransactionController(app, createTransaction);
new GetWalletController(app, getWalletByUserId);
new FindUserByIdController(app, findUserById);
new FindAllTransactionsByWalletIdController(app, findAllTransactionsByWalletId);

app.listen(3000, async (server) => {
  console.log(`🗃️ ROUTES LOADED`);

  app.routes.forEach(route => console.log(`[${route.method.toUpperCase()}] ${route.path}`));

  console.log(`🦊 Elypt is running at http://${server.hostname}:${server.port}`);
});