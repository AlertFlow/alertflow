package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

type Tokens struct {
	bun.BaseModel `bun:"table:tokens"`

	ID             uuid.UUID `bun:",pk,type:uuid,default:gen_random_uuid()" json:"id"`
	ProjectID      string    `bun:"project_id,type:text,notnull" json:"project_id"`
	Key            string    `bun:"key,type:text,notnull" json:"key"`
	Description    string    `bun:"description,type:text,default:''" json:"description"`
	Type           string    `bun:"type,type:text,notnull" json:"type"`
	Expired        bool      `bun:"expired,type:bool,default:false" json:"expired"`
	Disabled       bool      `bun:"disabled,type:bool,default:false" json:"disabled"`
	DisabledReason string    `bun:"disabled_reason,type:text,default:''" json:"disabled_reason"`
	CreatedAt      time.Time `bun:"created_at,type:timestamptz,default:now()" json:"created_at"`
}