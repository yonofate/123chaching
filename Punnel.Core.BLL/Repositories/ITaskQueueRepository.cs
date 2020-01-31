using System.Collections.Generic;
using System.Threading.Tasks;
using Punnel.Core.Entities.Model;
using Punnel.Core.Entities.ViewModel;

namespace Punnel.Core.BLL.Repositories
{
    public interface ITaskQueueRepository: IBaseRepository<TaskQueue>
    {
        void AddTask(TaskQueue obj);
        void ExecuteTask(TaskQueue obj);
        List<TaskQueue> GetToExecute();
    }
}