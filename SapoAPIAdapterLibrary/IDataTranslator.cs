using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SapoAPIAdapterLibrary
{

    /// <summary>
    /// An instance of this interface would translate the data between c# and the Sapo API
    /// </summary>
    public interface IDataTranslator
    {
        /// <summary>
        /// Encode the data in a way that is expected by the Sapo API
        /// </summary>
        /// <param name="data">data that should be encoded for the Sapo API</param>
        /// <returns></returns>
        string Encode(object data);

        /// <summary>
        /// Decode the data returned by the Sapo API
        /// </summary>
        /// <param name="encodedData">data encoded by the Sapo API</param>
        /// <returns></returns>
        object Decode(string encodedData);

        /// <summary>
        /// The Content Type (Mime Type) used by this translator
        /// </summary>
        /// <returns></returns>
        string GetContentType();
    }
}
