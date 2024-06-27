"""adding columns to all tables

Revision ID: 6dc04bf405bf
Revises: a45a92d44613
Create Date: 2024-06-26 20:09:23.598099

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6dc04bf405bf'
down_revision = 'a45a92d44613'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('servers',
        sa.Column('created_at', sa.DateTime())
    )


def downgrade():
    pass
