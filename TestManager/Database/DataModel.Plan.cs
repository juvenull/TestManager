﻿//------------------------------------------------------------------------------
// This is auto-generated code.
//------------------------------------------------------------------------------
// This code was generated by Entity Developer tool using EF Core template.
// Code is generated on: 06.10.2018 17:23:16
//
// Changes to this file may cause incorrect behavior and will be lost if
// the code is regenerated.
//------------------------------------------------------------------------------

using System;
using System.Data;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Data.Common;
using System.Collections.Generic;

namespace TestManager.Database
{
    public partial class Plan {

        public Plan()
        {
            this.Cases = new List<Case>();
            OnCreated();
        }

        public virtual int Id
        {
            get;
            set;
        }

        public virtual int IdProject
        {
            get;
            set;
        }

        public virtual string Name
        {
            get;
            set;
        }

        public virtual string Description
        {
            get;
            set;
        }

        public virtual System.DateTime DateCreated
        {
            get;
            set;
        }

        public virtual IList<Case> Cases
        {
            get;
            set;
        }

        public virtual Project Project
        {
            get;
            set;
        }
    
        #region Extensibility Method Definitions

        partial void OnCreated();
        
        #endregion
    }

}
