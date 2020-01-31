using StructureMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Punnel.Core.Entities
{
    public class ObjectFactory
    {
        private static IContainer _container;

        public static void SetContainer(IContainer container)
        {
            _container = container;
        }

        public static IContainer Container
        {
            get { return _container; }
        }

        public static T GetInstance<T>()
        {
            return _container.GetInstance<T>();
        }

        public static T GetInstance<T>(string instanceKey)
        {
            return _container.GetInstance<T>(instanceKey);
        }
    }
}
